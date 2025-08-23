// ========================================
// 🌏 BILINGUAL LANGUAGE CONFIGURATION
// ========================================
// This file contains all text translations for Chinese and English
// 这个文件包含所有中英文文本翻译

export const languages = {
  zh: {
    // Survey Title and Description
    surveyTitle: "住区街景热舒适感知调研",
    surveyDescription: "您好！我们正在进行一项关于不同类型住区街道热舒适感知的研究。该研究旨在了解哪些空间要素影响人们的热舒适感受。您的参与将为构建更舒适、可持续的城市居住环境提供科学依据。调研预计需要10-15分钟。",
    
    // Navigation
    languageSwitch: "English",
    next: "下一页",
    previous: "上一页",
    complete: "完成问卷",
    
    // Page Titles
    demographics: "第一部分：背景信息",
    thermalAffordance: "第二部分：热舒适感知评估",
    environmentalAssessment: "第三部分：环境要素评估",
    designQuality: "第四部分：空间设计质量",
    emotionalResponse: "第五部分：情感反应评估",
    featureRanking: "第六部分：热舒适影响因素重要性排序",
    
    // Page Descriptions
    demographicsDesc: "请提供一些关于您和您的住区的基本信息。这将帮助我们更好地理解不同类型住区的热舒适感知差异。",
    thermalAffordanceDesc: "请根据您的直觉感受，评估下列街道环境的热舒适性。",
    environmentalAssessmentDesc: "请评估下列街道环境的各种物理要素。",
    designQualityDesc: "请评估街道空间的设计质量和空间特征。",
    emotionalResponseDesc: "请评估街道环境引发的情感反应。",
    featureRankingDesc: "请按照对您的热舒适感受的重要性，对以下因素进行排序。",
    
    // Demographic Questions
    communityType: "您居住的住区类型是？",
    gender: "您的性别是？",
    age: "您的年龄是？",
    residenceDuration: "您在当前城市居住了多长时间？",
    outdoorActivity: "您在住区内进行户外活动的频率？",
    
    // Community Types
    highDense: "高层密集住区（高楼密集布局）",
    highOpen: "高层开放住区（高楼疏散布局）",
    midDense: "多层密集住区（中高楼密集布局）",
    midOpen: "多层开放住区（中高楼疏散布局）",
    lowDense: "低层密集住区（低楼密集布局）",
    lowOpen: "低层开放住区（低楼疏散布局）",
    mixed: "混合型住区（多种建筑类型混合）",
    uncertain: "不确定",
    
    // Gender Options
    male: "男",
    female: "女",
    
    // Age Options
    under18: "18岁以下",
    age18to24: "18~24岁",
    age25to30: "25~30岁", 
    age31to40: "31~40岁",
    age41to50: "41~50岁",
    age51to60: "51~60岁",
    over61: "61岁及以上",
    
    // Residence Duration Options
    lessThan1Year: "少于1年",
    oneToThreeYears: "1-3年",
    threeToFiveYears: "3-5年",
    fiveToTenYears: "5-10年",
    moreThanTenYears: "10年以上",
    
    // Activity Frequency Options
    daily: "每天",
    severalTimesWeek: "每周几次",
    onceWeek: "每周一次",
    severalTimesMonth: "每月几次",
    rarely: "很少",
    never: "从不",
    
    // Instructions
    thermalInstruction: "在本部分中，您将看到不同的街道环境。请想象您在这些街道上步行的感受，选择更舒适的环境。",
    thermalInstructionDesc: "请考虑阴影、绿化、建筑布局等因素对热舒适的影响。",
    environmentalInstruction: "请比较两张图片，选择在每个维度上更突出的街道环境。",
    
    // Questions
    thermalComfort: "热舒适性总体评估",
    temperatureIntensity: "温度强度感知",
    sunshineIntensity: "辐射感知",
    humidityInference: "湿度感知",
    windInference: "风速感知",
    trafficFlow: "交通流量感知",
    greeneryRate: "绿化率感知", 
    shadingArea: "阴影区域感知",
    materialComfort: "建筑材料舒适度",
    imageability: "可识别性",
    enclosure: "围合度",
    humanScale: "人性尺度",
    transparency: "通透性",
    complexity: "复杂性",
    safeFeeling: "安全感",
    beautifulFeeling: "美观感",
    livelyFeeling: "活力感",
    wealthyFeeling: "富裕感",
    boringFeeling: "无聊感",
    depressingFeeling: "压抑感",
    
    // Question Descriptions
    thermalComfortDesc: "哪个街道环境您感知具有更舒适的户外热环境？",
    temperatureIntensityDesc: "哪个街道环境您感知温度更高？",
    sunshineIntensityDesc: "哪个街道环境您感知辐射更强烈？",
    humidityInferenceDesc: "哪个街道环境您感知湿度更高？",
    windInferenceDesc: "哪个街道环境您感知风速更大？",
    trafficFlowDesc: "哪个街道环境传达出更高的交通流量？",
    greeneryRateDesc: "哪个街道环境具有更高的绿化率？",
    shadingAreaDesc: "哪个街道环境提供更多的阴影区域？",
    materialComfortDesc: "哪个街道环境的建筑材料看起来更舒适？",
    imageabilityDesc: "哪个街道环境更具特色和记忆点？",
    enclosureDesc: "哪个街道环境具有更好的空间围合感？",
    humanScaleDesc: "哪个街道环境更适合人的步行尺度？",
    transparencyDesc: "哪个街道环境的视觉通透性更好？",
    complexityDesc: "哪个街道环境的视觉复杂性更高？",
    safeFeelingDesc: "哪个街道环境让您感觉更安全？",
    beautifulFeelingDesc: "哪个街道环境让您感觉更美观？",
    livelyFeelingDesc: "哪个街道环境让您感觉更有活力？",
    wealthyFeelingDesc: "哪个街道环境让您感觉更富裕？",
    boringFeelingDesc: "哪个街道环境让您感觉更无聊？",
    depressingFeelingDesc: "哪个街道环境让您感觉更压抑？",
    
    // Ranking Section
    thermalComfortFactors: "请拖拽排序以下影响热舒适的因素，从最重要（顶部）到最不重要（底部）：",
    
    // Ranking Factors
    shading: "阴影遮阳",
    greenery: "绿化植被",
    ventilation: "自然通风",
    buildingLayout: "建筑密度和布局",
    waterFeatures: "水体或喷泉",
    pavementMaterial: "环境材料和颜色",
    streetWidth: "街道宽度和开放性",
    
    // Completion Messages
    thankYou: "感谢您完成问卷！您的回答已保存。",
    saveError: "保存回答时出现错误，请重试。"
  },
  
  en: {
    // Survey Title and Description
    surveyTitle: "Street Thermal Comfort Perception Survey",
    surveyDescription: "Hello! We are conducting a study on thermal comfort perception in different types of residential neighborhoods. This research aims to understand which spatial elements affect people's thermal comfort perception. Your participation will provide scientific evidence for building more comfortable and sustainable urban living environments. The survey takes approximately 10-15 minutes.",
    
    // Navigation
    languageSwitch: "中文",
    next: "Next",
    previous: "Previous",
    complete: "Complete",
    
    // Page Titles
    demographics: "Part 1: Background Information",
    thermalAffordance: "Part 2: Thermal Comfort Assessment",
    environmentalAssessment: "Part 3: Environmental Elements Assessment",
    designQuality: "Part 4: Spatial Design Quality",
    emotionalResponse: "Part 5: Emotional Response Assessment",
    featureRanking: "Part 6: Thermal Comfort Factor Importance Ranking",
    
    // Page Descriptions
    demographicsDesc: "Please provide some basic information about you and your residential community. This will help us better understand thermal comfort perception differences across different neighborhood types.",
    thermalAffordanceDesc: "Please evaluate the thermal comfort of the following street environments based on your intuitive feelings.",
    environmentalAssessmentDesc: "Please evaluate various physical elements of the following street environments.",
    designQualityDesc: "Please evaluate the design quality and spatial characteristics of the street spaces.",
    emotionalResponseDesc: "Please evaluate the emotional responses evoked by the street environments.",
    featureRankingDesc: "Please rank the following factors according to their importance to your thermal comfort perception.",
    
    // Demographic Questions
    communityType: "What type of residential community do you live in?",
    gender: "What is your gender?",
    age: "What is your age?",
    residenceDuration: "How long have you lived in your current city?",
    outdoorActivity: "How frequently do you engage in outdoor activities in your residential community?",
    
    // Community Types
    highDense: "High-rise Dense Community (Dense high-rise layout)",
    highOpen: "High-rise Open Community (Scattered high-rise layout)",
    midDense: "Mid-rise Dense Community (Dense mid-rise layout)",
    midOpen: "Mid-rise Open Community (Scattered mid-rise layout)",
    lowDense: "Low-rise Dense Community (Dense low-rise layout)",
    lowOpen: "Low-rise Open Community (Scattered low-rise layout)",
    mixed: "Mixed-type Community (Various building types mixed)",
    uncertain: "Uncertain",
    
    // Gender Options
    male: "Male",
    female: "Female",
    
    // Age Options
    under18: "Under 18",
    age18to24: "18-24",
    age25to30: "25-30", 
    age31to40: "31-40",
    age41to50: "41-50",
    age51to60: "51-60",
    over61: "61 and above",
    
    // Residence Duration Options
    lessThan1Year: "Less than 1 year",
    oneToThreeYears: "1-3 years",
    threeToFiveYears: "3-5 years",
    fiveToTenYears: "5-10 years",
    moreThanTenYears: "More than 10 years",
    
    // Activity Frequency Options
    daily: "Daily",
    severalTimesWeek: "Several times a week",
    onceWeek: "Once a week",
    severalTimesMonth: "Several times a month",
    rarely: "Rarely",
    never: "Never",
    
    // Instructions
    thermalInstruction: "In this section, you will see different street environments. Please imagine how you would feel walking on these streets and choose the more comfortable environment.",
    thermalInstructionDesc: "Please consider the impact of factors such as shade, greenery, and building layout on thermal comfort.",
    environmentalInstruction: "Please compare the two images and select the street environment that is more prominent in each dimension.",
    
    // Questions
    thermalComfort: "Overall Thermal Comfort Assessment",
    temperatureIntensity: "Temperature Intensity Perception",
    sunshineIntensity: "Solar Radiation Perception",
    humidityInference: "Humidity Perception",
    windInference: "Wind Speed Perception",
    trafficFlow: "Traffic Flow Perception",
    greeneryRate: "Greenery Rate Perception", 
    shadingArea: "Shaded Area Perception",
    materialComfort: "Building Material Comfort",
    imageability: "Imageability",
    enclosure: "Enclosure",
    humanScale: "Human Scale",
    transparency: "Transparency",
    complexity: "Complexity",
    safeFeeling: "Safety",
    beautifulFeeling: "Beauty",
    livelyFeeling: "Liveliness",
    wealthyFeeling: "Wealth",
    boringFeeling: "Boredom",
    depressingFeeling: "Depression",
    
    // Question Descriptions
    thermalComfortDesc: "Which street environment do you perceive as having a more comfortable outdoor thermal environment?",
    temperatureIntensityDesc: "Which street environment do you perceive as having higher temperature?",
    sunshineIntensityDesc: "Which street environment do you perceive as having stronger solar radiation?",
    humidityInferenceDesc: "Which street environment do you perceive as having higher humidity?",
    windInferenceDesc: "Which street environment do you perceive as having stronger wind?",
    trafficFlowDesc: "Which street environment conveys higher traffic flow?",
    greeneryRateDesc: "Which street environment has higher greenery rate?",
    shadingAreaDesc: "Which street environment provides more shaded areas?",
    materialComfortDesc: "Which street environment has more comfortable building materials?",
    imageabilityDesc: "Which street environment is more distinctive and memorable?",
    enclosureDesc: "Which street environment has better spatial enclosure?",
    humanScaleDesc: "Which street environment is more suitable for pedestrian scale?",
    transparencyDesc: "Which street environment has better visual transparency?",
    complexityDesc: "Which street environment has higher visual complexity?",
    safeFeelingDesc: "Which street environment makes you feel safer?",
    beautifulFeelingDesc: "Which street environment makes you feel it's more beautiful?",
    livelyFeelingDesc: "Which street environment makes you feel more lively?",
    wealthyFeelingDesc: "Which street environment makes you feel more wealthy?",
    boringFeelingDesc: "Which street environment makes you feel more bored?",
    depressingFeelingDesc: "Which street environment makes you feel more depressed?",
    
    // Ranking Section
    thermalComfortFactors: "Please drag to rank the following factors affecting thermal comfort, from most important (top) to least important (bottom):",
    
    // Ranking Factors
    shading: "Shade and Sun Protection",
    greenery: "Greenery and Vegetation",
    ventilation: "Natural Ventilation",
    buildingLayout: "Building Density and Layout",
    waterFeatures: "Water Bodies or Fountains",
    pavementMaterial: "Environmental Materials and Colors",
    streetWidth: "Street Width and Openness",
    
    // Completion Messages
    thankYou: "Thank you for completing the survey! Your responses have been saved.",
    saveError: "There was an error saving your responses. Please try again."
  }
};

// Default language
export const defaultLanguage = 'zh';

// Get current language text
export const getCurrentLanguage = (currentLang = defaultLanguage) => {
  return languages[currentLang] || languages[defaultLanguage];
};