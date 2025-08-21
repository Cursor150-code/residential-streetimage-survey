# 热舒适街景感知数据收集与机器学习训练流程

## 基于VATA框架的完整数据处理和模型训练指南

### 1. 数据导出格式 (Supabase → 训练数据)

#### 1.1 Supabase数据导出
```sql
-- 导出所有调研数据
SELECT * FROM survey_responses 
ORDER BY created_at DESC;

-- 导出格式示例
participant_id, created_at, community_type, age, location, residence_duration, 
thermal_affordance, temperature_intensity, sunshine_intensity, humidity_inference, 
wind_inference, traffic_flow, greenery_rate, shading_area, material_comfort,
imageability, enclosure, human_scale, transparency, complexity,
safe_feeling, beautiful_feeling, lively_feeling, wealthy_feeling, 
boring_feeling, depressing_feeling, thermal_comfort_factors_ranking,
thermal_comfort_feedback, community_comparison
```

#### 1.2 图像特征数据格式
根据论文中的方法，每张街景图像需要提取以下特征：

```python
# 图像特征提取结果格式（与您的featurize.cn输出对应）
image_features = {
    'filename': '6_114.015162_22.556585.jpg',
    'thermal_comfort': 1.83936882,
    'visual_comfort': 1.650846958,
    
    # 微气候推断特征
    'temp_intensity': 2.763100147,
    'sun_intensity': 2.230243921, 
    'humidity_inference': 1.466468811,
    'wind_inference': 1.095027804,
    
    # 环境评估特征
    'traffic_flow': 2.724167347,
    'greenery_rate': 1.13675487,
    'shading_area': 2.512201309,
    'material_comfort': 1.786097169,
    
    # 设计质量特征
    'imageability': 3.051387072,
    'enclosure': 3.027753115,
    'human_scale': 1.28943944,
    'transparency': 1.209984303,
    'complexity': 3.276931047,
    
    # 情感反应特征
    'safe': 1.953503728,
    'lively': 1.294391036,
    'beautiful': 1.222339153,
    'wealthy': 1.979789615,
    'boring': 2.83527565,
    'depressing': 3.090892792,
    
    # 语义分割特征 (19个元素)
    'seg_road': 0.296930208,
    'seg_sidewalk': 0.000282292,
    'seg_building': 0.262815625,
    # ... 其他16个分割特征
    
    # 目标检测特征 (10个对象)
    'det_person': 14,
    'det_bicycle': 0,
    'det_car': 46,
    # ... 其他7个检测特征
    
    # 像素特征 (12个)
    'colorfulness': 24.27198501,
    'canny_edges': 19.98522656,
    'hue_mean': 63.25801094,
    # ... 其他9个像素特征
    
    # 场景识别特征 (16个场景)
    'scene_downtown': 0.7412055,
    'scene_office_building': 0.024115834,
    # ... 其他14个场景特征
    
    # 元数据
    'community_type': 'LCZ4-高层开放-C2点式建筑行列式',
    'community': '12440-万科瑧山府',
    'analysis_time': '25/07/2025 21:21'
}
```

### 2. 数据预处理流程

#### 2.1 问卷数据预处理
```python
import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler

def preprocess_survey_data(survey_df):
    """
    基于TrueSkill算法的问卷数据预处理
    参考论文第3.2节和附录A
    """
    
    # 1. 数据清洗
    survey_df = survey_df.dropna(subset=['thermal_affordance'])
    
    # 2. 实现TrueSkill排序算法
    # 将成对比较转换为0-5分评分
    def trueskill_scoring(comparison_data):
        """
        实现TrueSkill算法，将成对比较转换为标准化评分
        """
        # 初始化技能评分 (μ=2.5, σ=1)
        skills = {img: {'mu': 2.5, 'sigma': 1.0} for img in comparison_data['images']}
        
        # 迭代更新评分
        for comparison in comparison_data['pairs']:
            winner, loser = comparison['winner'], comparison['loser']
            # 贝叶斯更新公式（简化版）
            update_skills(skills, winner, loser)
        
        # 标准化到0-5范围
        scores = {img: normalize_score(skill['mu']) for img, skill in skills.items()}
        return scores
    
    # 3. 标准化VPI评分
    vpi_columns = [
        'thermal_affordance', 'temperature_intensity', 'sunshine_intensity',
        'humidity_inference', 'wind_inference', 'traffic_flow', 'greenery_rate',
        'shading_area', 'material_comfort', 'imageability', 'enclosure',
        'human_scale', 'transparency', 'complexity', 'safe_feeling',
        'beautiful_feeling', 'lively_feeling', 'wealthy_feeling',
        'boring_feeling', 'depressing_feeling'
    ]
    
    # 设置标准差为1以平衡区分度和分布均匀性
    for col in vpi_columns:
        survey_df[col] = standardize_scores(survey_df[col], target_std=1.0)
    
    return survey_df

def standardize_scores(scores, target_std=1.0):
    """标准化评分分布"""
    current_std = np.std(scores)
    current_mean = np.mean(scores)
    
    # 调整到目标标准差
    normalized = (scores - current_mean) / current_std * target_std + 2.5
    return np.clip(normalized, 0, 5)
```

#### 2.2 图像特征数据预处理
```python
def preprocess_image_features(features_df):
    """
    处理从featurize.cn获得的图像特征数据
    """
    
    # 1. 特征分类 (论文Table 2)
    feature_categories = {
        'semantic': ['seg_' + x for x in ['road', 'sidewalk', 'building', 'wall', 
                    'fence', 'pole', 'traffic_light', 'traffic_sign', 'vegetation', 
                    'terrain', 'sky', 'person', 'rider', 'car', 'truck', 'bus', 
                    'train', 'motorcycle', 'bicycle']],
        
        'object_detection': ['det_' + x for x in ['person', 'bicycle', 'car', 
                           'motorcycle', 'bus', 'truck', 'traffic_light', 
                           'fire_hydrant', 'stop_sign', 'bench']],
        
        'pixel_features': ['colorfulness', 'canny_edges', 'hue_mean', 'hue_std',
                          'saturation_mean', 'saturation_std', 'lightness_mean',
                          'lightness_std', 'contrast', 'sharpness', 'entropy',
                          'image_variance'],
        
        'scene_recognition': ['scene_' + x for x in ['downtown', 'office_building',
                            'apartment_building/outdoor', 'residential_neighborhood',
                            'food_court', 'parking_lot', 'driveway', 'highway',
                            'plaza', 'market/outdoor', 'campus', 'promenade',
                            'field/wild', 'forest_path', 'forest/broadleaf', 'park',
                            'construction_site', 'industrial_area']]
    }
    
    # 2. 数据标准化
    scaler = StandardScaler()
    for category in feature_categories:
        features_df[feature_categories[category]] = scaler.fit_transform(
            features_df[feature_categories[category]]
        )
    
    # 3. 创建两个数据集
    # D1: 包含卷积特征的完整数据集（用于MTNNL）
    D1_features = features_df[
        feature_categories['semantic'] + 
        feature_categories['object_detection'] + 
        feature_categories['pixel_features'] + 
        feature_categories['scene_recognition']
    ]
    
    # D2: 排除卷积特征的可解释数据集（用于ENRM）
    D2_features = features_df[
        feature_categories['semantic'] + 
        feature_categories['object_detection'] + 
        feature_categories['scene_recognition']
    ]
    
    return D1_features, D2_features
```

### 3. 模型训练架构

#### 3.1 多任务神经网络 (MTNNL) 实现
```python
import torch
import torch.nn as nn
import torch.nn.functional as F

class MTNNLModel(nn.Module):
    """
    多任务神经网络学习模型
    Stage 1: IF → VPI (图像特征 → 视觉感知指标)
    Stage 2: IF + VPI → VATA (综合预测热负担能力)
    """
    
    def __init__(self, input_dim, vpi_dim=19, hidden_dim=512):
        super(MTNNLModel, self).__init__()
        
        # Stage 1: IF → VPI 预测网络
        self.feature_encoder = nn.Sequential(
            nn.Linear(input_dim, hidden_dim),
            nn.ReLU(),
            nn.Dropout(0.3),
            nn.Linear(hidden_dim, hidden_dim // 2),
            nn.ReLU(),
            nn.Dropout(0.3)
        )
        
        self.vpi_predictor = nn.Linear(hidden_dim // 2, vpi_dim)
        
        # Stage 2: IF + VPI → VATA 预测网络
        self.vata_predictor = nn.Sequential(
            nn.Linear(hidden_dim // 2 + vpi_dim, hidden_dim // 4),
            nn.ReLU(),
            nn.Dropout(0.2),
            nn.Linear(hidden_dim // 4, 1)
        )
    
    def forward(self, x):
        # Stage 1: 预测VPI
        features = self.feature_encoder(x)
        vpi_pred = self.vpi_predictor(features)
        
        # Stage 2: 结合IF和VPI预测VATA
        combined = torch.cat([features, vpi_pred], dim=1)
        vata_pred = self.vata_predictor(combined)
        
        return vpi_pred, vata_pred

def train_mtnnl_model(D1_features, vpi_scores, vata_scores):
    """训练MTNNL模型"""
    
    model = MTNNLModel(input_dim=D1_features.shape[1])
    optimizer = torch.optim.Adam(model.parameters(), lr=0.001)
    
    # 加权损失函数
    def combined_loss(vpi_pred, vpi_true, vata_pred, vata_true, alpha=0.3):
        vpi_loss = F.mse_loss(vpi_pred, vpi_true)
        vata_loss = F.mse_loss(vata_pred, vata_true)
        return alpha * vpi_loss + (1 - alpha) * vata_loss
    
    # 训练循环
    for epoch in range(num_epochs):
        optimizer.zero_grad()
        vpi_pred, vata_pred = model(D1_features)
        loss = combined_loss(vpi_pred, vpi_scores, vata_pred, vata_scores)
        loss.backward()
        optimizer.step()
    
    return model
```

#### 3.2 弹性网络回归模型 (ENRM) 实现
```python
from sklearn.linear_model import ElasticNet
from sklearn.model_selection import GridSearchCV

def train_enrm_model(D2_features, vpi_scores, vata_scores):
    """
    训练可解释的弹性网络回归模型
    用于分析IF-VPI-VATA关系
    """
    
    # Stage 1: IF → VPI 回归模型
    vpi_models = {}
    for i, vpi_name in enumerate(vpi_names):
        # 网格搜索最优参数
        param_grid = {
            'alpha': [0.01, 0.1, 1.0, 10.0],
            'l1_ratio': [0.1, 0.3, 0.5, 0.7, 0.9]
        }
        
        elastic_net = ElasticNet(max_iter=1000)
        grid_search = GridSearchCV(elastic_net, param_grid, cv=5, scoring='r2')
        grid_search.fit(D2_features, vpi_scores[:, i])
        
        vpi_models[vpi_name] = grid_search.best_estimator_
    
    # Stage 2: IF + VPI → VATA 回归模型
    # 合并IF和VPI特征
    vpi_predictions = np.column_stack([
        model.predict(D2_features) for model in vpi_models.values()
    ])
    
    combined_features = np.column_stack([D2_features, vpi_predictions])
    
    # 训练VATA预测模型
    vata_model = ElasticNet(alpha=0.007, l1_ratio=0.5)
    vata_model.fit(combined_features, vata_scores)
    
    return vpi_models, vata_model

def analyze_feature_importance(vata_model, feature_names):
    """分析特征重要性"""
    coefficients = vata_model.coef_
    feature_importance = pd.DataFrame({
        'feature': feature_names,
        'coefficient': coefficients,
        'abs_coefficient': np.abs(coefficients)
    }).sort_values('abs_coefficient', ascending=False)
    
    return feature_importance
```

### 4. 数据整合与训练流程

#### 4.1 完整训练流程
```python
def complete_training_pipeline():
    """完整的VATA模型训练流程"""
    
    # 1. 加载问卷数据
    survey_df = load_supabase_data()
    survey_processed = preprocess_survey_data(survey_df)
    
    # 2. 加载图像特征数据
    image_features_df = load_image_features()  # 从featurize.cn导出
    D1_features, D2_features = preprocess_image_features(image_features_df)
    
    # 3. 数据对齐（根据图像文件名匹配）
    aligned_data = align_survey_and_features(survey_processed, image_features_df)
    
    # 4. 分割训练/验证/测试集 (60%/20%/20%)
    train_data, val_data, test_data = split_data(aligned_data, 
                                                train_ratio=0.6,
                                                val_ratio=0.2,
                                                test_ratio=0.2)
    
    # 5. 训练MTNNL模型（预测用）
    mtnnl_model = train_mtnnl_model(
        train_data['D1_features'], 
        train_data['vpi_scores'], 
        train_data['vata_scores']
    )
    
    # 6. 训练ENRM模型（推断用）
    vpi_models, vata_model = train_enrm_model(
        train_data['D2_features'],
        train_data['vpi_scores'],
        train_data['vata_scores']
    )
    
    # 7. 模型验证
    validation_results = validate_models(mtnnl_model, vata_model, test_data)
    
    return {
        'mtnnl_model': mtnnl_model,
        'enrm_models': {'vpi_models': vpi_models, 'vata_model': vata_model},
        'validation_results': validation_results
    }
```

#### 4.2 模型验证方法
```python
def validate_with_field_data(model, field_otc_data):
    """
    使用现场OTC数据验证VATA框架
    参考论文第3.5节验证方法
    """
    
    # 1. 收集对应位置的街景图像
    field_images = collect_field_survey_images(field_otc_data['locations'])
    
    # 2. 提取图像特征
    field_features = extract_image_features(field_images)
    
    # 3. 预测VATA值
    vata_predictions = model.predict(field_features)
    
    # 4. 与现场舒适度数据比较
    correlation = np.corrcoef(vata_predictions, field_otc_data['comfort_scores'])[0,1]
    
    # 5. 多变量线性建模（VATA + HSNA）
    hsna_features = field_otc_data[['heart_rate', 'solar_intensity', 'noise', 'altitude']]
    combined_predictors = np.column_stack([vata_predictions, hsna_features])
    
    # 线性回归验证
    from sklearn.linear_model import LinearRegression
    validation_model = LinearRegression()
    validation_model.fit(combined_predictors, field_otc_data['comfort_scores'])
    
    r2_score = validation_model.score(combined_predictors, field_otc_data['comfort_scores'])
    
    return {
        'vata_otc_correlation': correlation,
        'combined_model_r2': r2_score,
        'validation_model': validation_model
    }
```

### 5. 与开源项目集成

#### 5.1 Thermal-Affordance项目集成
```bash
# 克隆开源项目
git clone https://github.com/Sijie-Yang/Thermal-Affordance.git
git clone https://github.com/Sijie-Yang/urbancode.git

# 数据格式转换
python convert_survey_to_thermal_affordance.py \
    --survey_data survey_responses.csv \
    --image_features image_features.csv \
    --output_dir ./thermal_affordance_data/
```

#### 5.2 数据标准化脚本
```python
def convert_to_thermal_affordance_format(survey_data, image_features):
    """
    转换为Thermal-Affordance项目所需格式
    """
    
    # 匹配论文中的评分系统
    vata_data = pd.DataFrame({
        'image_id': survey_data['image_filename'],
        'thermal_affordance': survey_data['thermal_affordance'],
        
        # 微气候推断 (4个VPI)
        'temp_intensity': survey_data['temperature_intensity'],
        'sun_intensity': survey_data['sunshine_intensity'],
        'humidity_inference': survey_data['humidity_inference'],
        'wind_inference': survey_data['wind_inference'],
        
        # 环境评估 (4个VPI)
        'traffic_flow': survey_data['traffic_flow'],
        'greenery_rate': survey_data['greenery_rate'],
        'shading_area': survey_data['shading_area'],
        'material_comfort': survey_data['material_comfort'],
        
        # 设计质量 (5个VPI)
        'imageability': survey_data['imageability'],
        'enclosure': survey_data['enclosure'],
        'human_scale': survey_data['human_scale'],
        'transparency': survey_data['transparency'],
        'complexity': survey_data['complexity'],
        
        # 情感反应 (6个VPI)
        'safe': survey_data['safe_feeling'],
        'beautiful': survey_data['beautiful_feeling'],
        'lively': survey_data['lively_feeling'],
        'wealthy': survey_data['wealthy_feeling'],
        'boring': survey_data['boring_feeling'],
        'depressing': survey_data['depressing_feeling'],
        
        # 社区类型标签
        'community_type': survey_data['community_type']
    })
    
    # 合并图像特征数据
    final_dataset = pd.merge(vata_data, image_features, 
                           left_on='image_id', right_on='filename')
    
    return final_dataset
```

### 6. 模型应用与预测

#### 6.1 城市尺度VATA预测
```python
def predict_citywide_vata(trained_model, all_street_images):
    """
    对整个城市的92,233张街景图像进行VATA预测
    参考论文第4.3节
    """
    
    # 批量处理大量图像
    batch_size = 1000
    all_predictions = []
    
    for i in range(0, len(all_street_images), batch_size):
        batch = all_street_images[i:i+batch_size]
        
        # 提取特征
        batch_features = extract_batch_features(batch)
        
        # 预测VATA
        batch_predictions = trained_model.predict(batch_features)
        all_predictions.extend(batch_predictions)
    
    # 空间聚合（H3六边形网格）
    spatial_vata = aggregate_to_hexagons(all_predictions, 
                                       image_coordinates,
                                       resolution=9)  # ~0.1 km²
    
    return spatial_vata

def generate_vata_map(spatial_vata):
    """生成VATA热力图"""
    # 分类VATA水平
    # 高VATA: 3.24 < VATA ≤ 5 (蓝色)
    # 中VATA: 1.76 < VATA ≤ 3.24 (灰色)  
    # 低VATA: 0 ≤ VATA ≤ 1.76 (红色)
    
    vata_categories = pd.cut(spatial_vata['vata_score'],
                           bins=[0, 1.76, 3.24, 5],
                           labels=['Low', 'Medium', 'High'])
    
    return vata_categories
```

### 7. 结果分析与应用

#### 7.1 特征关系分析
```python
def analyze_if_vpi_vata_relationships(enrm_models):
    """
    分析IF-VPI-VATA关系链
    生成Sankey图和相关性分析
    """
    
    # 提取模型系数
    positive_weights = {}
    negative_weights = {}
    
    for model_name, model in enrm_models.items():
        coefficients = model.coef_
        positive_weights[model_name] = coefficients[coefficients > 0]
        negative_weights[model_name] = coefficients[coefficients < 0]
    
    # 生成设计建议
    design_insights = {
        'positive_factors': [
            '增加植被和地形比例改善街道微气候',
            '增加建筑和公共空间提升遮阴面积',
            '改善整体色调外观提升视觉舒适度',
            '增加人性化基础设施使街景更人性化舒适'
        ],
        'negative_factors': [
            '减少遮阴面积导致更多直射阳光和高温',
            '增加建筑材料和复杂城市场景比例',
            '更多车辆交通元素意味着更少行人连接',
            '缺乏人性化设计表明基础设施便利性下降'
        ]
    }
    
    return design_insights
```

### 8. 部署和应用

#### 8.1 Git提交和部署
```bash
# 提交修改
cd "C:\0Urbancode\Streetview survey\Streetscape-Perception-Survey-main\Streetscape-Perception-Survey-main"
git add .
git commit -m "Implement VATA framework for thermal comfort survey - Updated questions based on thermal affordance theory"
git push origin main

# Vercel会自动重新部署
```

#### 8.2 数据收集监控
```python
def monitor_data_collection():
    """监控数据收集进度"""
    
    # 检查每个社区类型的样本数量
    community_distribution = survey_data.groupby('community_type').size()
    
    # 目标：每个LCZ类型至少100个有效样本
    target_samples = 100
    collection_status = {}
    
    for lcz_type in ['LCZ1', 'LCZ2', 'LCZ3', 'LCZ4', 'LCZ5', 
                     'LCZ6', 'LCZ7', 'LCZ8', 'LCZ9']:
        current_count = community_distribution.get(lcz_type, 0)
        collection_status[lcz_type] = {
            'current': current_count,
            'target': target_samples,
            'progress': current_count / target_samples * 100
        }
    
    return collection_status
```

### 9. 研究应用框架

#### 9.1 热脆弱性分析
```python
def identify_thermal_vulnerability(vata_predictions, community_types):
    """
    识别热脆弱和不舒适区域
    """
    
    vulnerability_analysis = {}
    
    for community in community_types:
        community_vata = vata_predictions[
            vata_predictions['community_type'] == community
        ]
        
        # 计算热脆弱性指标
        mean_vata = community_vata['vata_score'].mean()
        low_vata_percentage = (community_vata['vata_score'] <= 1.76).mean() * 100
        
        vulnerability_analysis[community] = {
            'mean_thermal_affordance': mean_vata,
            'vulnerable_areas_percentage': low_vata_percentage,
            'risk_level': 'High' if low_vata_percentage > 30 else 
                        'Medium' if low_vata_percentage > 15 else 'Low'
        }
    
    return vulnerability_analysis
```

### 10. 数据质量保证

#### 10.1 数据验证检查
```python
def validate_data_quality(survey_data, image_features):
    """数据质量检查"""
    
    quality_report = {
        'survey_completeness': survey_data.isnull().sum(),
        'image_feature_coverage': len(image_features) / 444,  # 444张总图片
        'community_balance': survey_data['community_type'].value_counts(),
        'response_consistency': check_response_consistency(survey_data)
    }
    
    return quality_report
```

该文档提供了从问卷数据收集到机器学习模型训练的完整流程，严格遵循了VATA框架的科学方法论。