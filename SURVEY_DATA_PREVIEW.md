# 热舒适感知问卷数据结构预览

## 基于VATA框架的问卷数据收集格式

### 1. 问卷结构概览

```
调研总时长：15-20分钟
总问题数：约25个核心问题
图片比较：约40-50次成对比较
数据收集：7个维度 + 背景信息
```

### 2. 数据库表结构 (Supabase)

#### 2.1 主响应表 `survey_responses`
```sql
CREATE TABLE survey_responses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    participant_id TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- 第一部分：背景信息
    community_type TEXT,  -- LCZ1-LCZ9住区类型
    age TEXT,
    location TEXT,
    residence_duration TEXT,
    outdoor_activity TEXT,
    thermal_sensitivity TEXT,
    
    -- 第二部分：热舒适感知评估 (核心VATA)
    thermal_affordance TEXT,      -- 选择的图片文件名
    temperature_intensity TEXT,   -- 温度感知
    sunshine_intensity TEXT,      -- 阳光感知  
    humidity_inference TEXT,      -- 湿度感知
    wind_inference TEXT,          -- 风速感知
    
    -- 第三部分：环境要素评估
    traffic_flow TEXT,           -- 交通流量感知
    greenery_rate TEXT,          -- 绿化率感知
    shading_area TEXT,           -- 遮阴面积感知
    material_comfort TEXT,       -- 材料舒适度
    
    -- 第四部分：空间设计质量
    imageability TEXT,           -- 可识别性
    enclosure TEXT,              -- 围合度
    human_scale TEXT,            -- 人性尺度
    transparency TEXT,           -- 通透性
    complexity TEXT,             -- 复杂性
    
    -- 第五部分：情感反应
    safe_feeling TEXT,           -- 安全感
    beautiful_feeling TEXT,      -- 美观感
    lively_feeling TEXT,         -- 活力感
    wealthy_feeling TEXT,        -- 富裕感
    boring_feeling TEXT,         -- 无聊感
    depressing_feeling TEXT,     -- 压抑感
    
    -- 第六部分：重要性排序
    thermal_comfort_factors_ranking JSONB,  -- 排序结果
    
    -- 第七部分：开放反馈
    thermal_comfort_feedback TEXT,
    community_comparison TEXT,
    
    -- 元数据
    session_duration INTEGER,     -- 完成时长(秒)
    device_type TEXT,            -- 设备类型
    ip_address INET,             -- IP地址(匿名化)
    completion_status TEXT DEFAULT 'completed'
);
```

### 3. 样本数据预览

#### 3.1 单个参与者响应示例
```json
{
  "participant_id": "p_2024_001",
  "created_at": "2024-08-21T10:30:00Z",
  
  // 背景信息
  "community_type": "LCZ4-高层开放-C2点式建筑行列式",
  "age": "25-34岁",
  "location": "深圳",
  "residence_duration": "3-5年",
  "outdoor_activity": "每周几次",
  "thermal_sensitivity": "比较敏感",
  
  // 热舒适感知评估 (图片文件名)
  "thermal_affordance": "025_130_114.148346_22.585114.jpg",
  "temperature_intensity": "040_204_114.421522_22.636439.jpg",
  "sunshine_intensity": "015_44_114.129801_22.583005.jpg",
  "humidity_inference": "033_42_114.187664_22.571720.jpg",
  "wind_inference": "028_25_114.095694_22.559631.jpg",
  
  // 环境要素评估
  "traffic_flow": "042_242_114.228231_22.706982.jpg",
  "greenery_rate": "020_132_113.895031_22.593188.jpg",
  "shading_area": "035_143_114.267280_22.732937.jpg",
  "material_comfort": "030_46_114.062748_22.643036.jpg",
  
  // 空间设计质量
  "imageability": "034_113_114.226335_22.710791.jpg",
  "enclosure": "041_164_114.028090_22.656806.jpg",
  "human_scale": "027_17_114.085033_22.539541.jpg",
  "transparency": "038_51_114.101855_22.545009.jpg",
  "complexity": "045_128_113.874340_22.562104.jpg",
  
  // 情感反应
  "safe_feeling": "025_181_113.825909_22.676493.jpg",
  "beautiful_feeling": "033_172_113.862792_22.771515.jpg",
  "lively_feeling": "040_27_113.953539_22.587597.jpg", 
  "wealthy_feeling": "041_103_114.096170_22.710202.jpg",
  "boring_feeling": "044_52_114.089178_22.541874.jpg",
  "depressing_feeling": "048_27_113.911973_22.484287.jpg",
  
  // 重要性排序 (拖拽结果)
  "thermal_comfort_factors_ranking": [
    "shading",        // 第1重要
    "greenery",       // 第2重要
    "ventilation",    // 第3重要
    "building_layout", // 第4重要
    "water_features", // 第5重要
    "pavement_material", // 第6重要
    "street_width"    // 第7重要
  ],
  
  // 开放反馈
  "thermal_comfort_feedback": "我认为充足的树荫和良好的通风是最重要的。水景和浅色铺装也能显著改善热舒适感。",
  "community_comparison": "我们小区的高层建筑提供了一些遮阴，但绿化不够，夏天还是比较热。",
  
  // 元数据
  "session_duration": 1180,  // 19分40秒
  "device_type": "desktop",
  "completion_status": "completed"
}
```

### 4. 聚合数据分析格式

#### 4.1 社区类型热舒适分析
```json
{
  "community_analysis": {
    "LCZ1-密集高层建筑区": {
      "sample_size": 89,
      "thermal_affordance_mean": 2.34,
      "thermal_affordance_std": 0.87,
      "top_comfort_factors": ["shading", "greenery", "ventilation"],
      "vulnerability_score": 0.65,  // 0-1, 越高越脆弱
      "characteristic_features": {
        "high_building_density": 0.78,
        "low_greenery_rate": 0.23,
        "poor_ventilation": 0.67
      }
    },
    
    "LCZ4-高层开放建筑区": {
      "sample_size": 92,
      "thermal_affordance_mean": 2.78,
      "thermal_affordance_std": 0.92,
      "top_comfort_factors": ["building_layout", "shading", "street_width"],
      "vulnerability_score": 0.43,
      "characteristic_features": {
        "moderate_building_density": 0.56,
        "better_openness": 0.72,
        "improved_airflow": 0.58
      }
    },
    
    "LCZ6-低层开放建筑区": {
      "sample_size": 95,
      "thermal_affordance_mean": 3.21,
      "thermal_affordance_std": 0.76,
      "top_comfort_factors": ["greenery", "human_scale", "water_features"],
      "vulnerability_score": 0.28,
      "characteristic_features": {
        "high_greenery_rate": 0.84,
        "human_scale_design": 0.79,
        "good_thermal_comfort": 0.81
      }
    }
    // ... 其他6类住区分析
  }
}
```

### 5. 机器学习训练数据格式

#### 5.1 特征矩阵构建
```python
# 最终训练数据集结构
training_dataset = {
    # IF (图像特征) - 来自featurize.cn分析
    'image_features': {
        'semantic_segmentation': [19个元素比例],  # seg_road, seg_building等
        'object_detection': [10个对象计数],       # det_person, det_car等  
        'pixel_features': [12个像素特征],         # colorfulness, contrast等
        'scene_recognition': [16个场景概率]       # scene_downtown, scene_park等
    },
    
    # VPI (视觉感知指标) - 来自问卷评分
    'visual_perceptual_indicators': {
        'microclimate_inference': [4个维度],     # 温度、阳光、湿度、风速
        'environmental_assessment': [4个维度],   # 交通、绿化、遮阴、材料
        'design_quality': [5个维度],            # 可识别性、围合度等
        'emotional_response': [6个维度]          # 安全、美观、活力等
    },
    
    # VATA (目标变量) - 热负担能力评分
    'thermal_affordance_score': 'float 0-5',
    
    # 元数据
    'metadata': {
        'image_filename': 'string',
        'community_type': 'LCZ1-9',
        'participant_demographics': 'dict',
        'spatial_coordinates': [longitude, latitude]
    }
}
```

### 6. 预期研究输出

#### 6.1 模型性能指标
```
MTNNL预测模型性能目标：
- Adjusted R² > 0.70 (论文中达到0.7316)
- MAE < 0.20 (论文中达到0.1960)
- 验证集相关性 > 0.75

ENRM推断模型指标：
- IF→VPI R² > 0.60 (大多数VPI)
- VPI→VATA R² > 0.74
- 特征权重可解释性分析
```

#### 6.2 应用分析结果
```
1. 9类住区热脆弱性排序
2. 各住区类型热舒适影响因子权重分析
3. 空间要素-热舒适关系量化
4. 热不舒适区域识别和改善建议
5. 可视化热舒适地图生成
```

### 7. 问卷用户体验预览

```
用户流程：
1. 首页介绍 → 2. 背景信息(6题) → 3. 热感知评估(5题成对比较) 
→ 4. 环境评估(4题) → 5. 设计质量(5题) → 6. 情感反应(6题) 
→ 7. 排序任务(1题) → 8. 开放反馈(2题) → 完成

每题显示：2张街景图片供选择
成对比较：基于TrueSkill算法的科学评分方法
时长估计：15-20分钟
```

---

**请审查以上设计，如需修改请提出具体要求，我将进行第二次优化调整。**