import { getRandomImages } from './streetImages.js';

// ========================================
// 📚 CITATION
// ========================================
// This survey platform was initially developed for:
// Yang, S., Chong, A., Liu, P., & Biljecki, F. (2025). 
// Thermal comfort in sight: Thermal affordance and its visual assessment for sustainable streetscape design. 
// Building and Environment, 112569. Elsevier.
//
// If you use this platform in your research, please consider citing the above paper.

// ========================================
// 🔧 SURVEY CONFIGURATION GUIDE
// ========================================
// This file defines all survey questions and structure.
// Follow the instructions below to customize your survey.

// ========================================
// 📸 IMAGE GENERATION CONFIGURATION
// ========================================
// This function pre-generates random images for each question to ensure consistency.
// Each participant sees the same set of images throughout their survey session.

const generateQuestionImages = () => {
  const questionImages = {
    // 🔧 THERMAL AFFORDANCE QUESTIONS (Part 2) - Based on VATA Framework
    // Format: question_name: getRandomImages("question_name", number_of_images)
    thermal_affordance: getRandomImages("thermal_affordance", 2),           // Core VATA question
    temperature_intensity: getRandomImages("temperature_intensity", 2),       // Microclimate inference
    sunshine_intensity: getRandomImages("sunshine_intensity", 2),             // Microclimate inference
    humidity_inference: getRandomImages("humidity_inference", 2),             // Microclimate inference
    wind_inference: getRandomImages("wind_inference", 2),                     // Microclimate inference
    
    // 🔧 ENVIRONMENTAL ASSESSMENT QUESTIONS (Part 3)
    traffic_flow: getRandomImages("traffic_flow", 2),                         // Environmental evaluation
    greenery_rate: getRandomImages("greenery_rate", 2),                       // Environmental evaluation
    shading_area: getRandomImages("shading_area", 2),                         // Environmental evaluation
    material_comfort: getRandomImages("material_comfort", 2),                 // Environmental evaluation
    
    // 🔧 DESIGN QUALITY QUESTIONS (Part 4)
    imageability: getRandomImages("imageability", 2),                         // Design quality
    enclosure: getRandomImages("enclosure", 2),                               // Design quality
    human_scale: getRandomImages("human_scale", 2),                           // Design quality
    transparency: getRandomImages("transparency", 2),                         // Design quality
    complexity: getRandomImages("complexity", 2),                             // Design quality
    
    // 🔧 EMOTIONAL RESPONSE QUESTIONS (Part 5)
    safe_feeling: getRandomImages("safe_feeling", 2),                         // Evoked emotion
    beautiful_feeling: getRandomImages("beautiful_feeling", 2),               // Evoked emotion
    lively_feeling: getRandomImages("lively_feeling", 2),                     // Evoked emotion
    wealthy_feeling: getRandomImages("wealthy_feeling", 2),                   // Evoked emotion
    boring_feeling: getRandomImages("boring_feeling", 2),                     // Evoked emotion
    depressing_feeling: getRandomImages("depressing_feeling", 2),             // Evoked emotion
    
    // 🔧 OTHER QUESTIONS (Part 6)
    feature_ranking: getRandomImages("feature_ranking", 1)   // Part 6: Ranking
  };
  
  return questionImages;
};

// Store all displayed images for this survey session
export const displayedImages = generateQuestionImages();

// ========================================
// 👥 DEMOGRAPHIC QUESTIONS (PART 1)
// ========================================
// All demographic questions are OPTIONAL and can be skipped by participants.
// 🔧 TO CUSTOMIZE: Edit the questions below or add/remove questions as needed.

export const demographicQuestions = [
  // 🔧 RESIDENTIAL COMMUNITY TYPE - 8 comprehensive options
  {
    name: "community_type",
    title: "您居住的住区类型是？",
    type: "radiogroup",
    choices: [
      "高层密集住区（高楼密集布局）",
      "高层开放住区（高楼疏散布局）",
      "多层密集住区（中高楼密集布局）",
      "多层开放住区（中高楼疏散布局）",
      "低层密集住区（低楼密集布局）",
      "低层开放住区（低楼疏散布局）",
      "混合型住区（多种建筑类型混合）",
      "不确定"
    ],
    isRequired: true
  },
  
  // 🔧 GENDER QUESTION
  {
    name: "gender",
    title: "您的性别是？",
    type: "radiogroup",
    choices: [
      "男",
      "女"
    ],
    isRequired: true
  },
  
  // 🔧 AGE QUESTION
  {
    name: "age",
    title: "您的年龄是？",
    type: "radiogroup",
    choices: [
      "18岁以下",
      "18~24岁", 
      "25~30岁",
      "31~40岁", 
      "41~50岁",
      "51~60岁",
      "61岁及以上"
    ],
    isRequired: true
  },
  
  // 🔧 RESIDENCE DURATION
  {
    name: "residence_duration",
    title: "您在当前城市居住了多长时间？",
    type: "radiogroup",
    choices: [
      "少于1年",
      "1-3年",
      "3-5年",
      "5-10年",
      "10年以上"
    ],
    isRequired: true
  },
  
  // 🔧 OUTDOOR ACTIVITY FREQUENCY
  {
    name: "outdoor_activity",
    title: "您在住区内进行户外活动的频率？",
    type: "radiogroup",
    choices: [
      "每天",
      "每周几次",
      "每周一次",
      "每月几次", 
      "很少",
      "从不"
    ],
    isRequired: true
  }
  
  // 🔧 TO ADD NEW DEMOGRAPHIC QUESTIONS:
  // Copy the format above and add new questions here.
  // Remember to add a comma after the previous question!
  
  // Example of adding a new question:
  // {
  //   name: "your_question_name",
  //   title: "Your question text?",
  //   type: "radiogroup", // or "text", "comment", "checkbox"
  //   choices: ["Option 1", "Option 2", "Option 3"], // only for radiogroup/checkbox
  //   isRequired: false
  // }
];

// ========================================
// 📋 MAIN SURVEY STRUCTURE
// ========================================
// The survey is organized into 6 parts (pages). Each page contains multiple questions.
// 🔧 TO CUSTOMIZE: Modify the pages below or add/remove pages as needed.

export const surveyPages = [
  
  // ========================================
  // 📄 PAGE 1: DEMOGRAPHIC QUESTIONS
  // ========================================
  {
    name: "demographics",
    title: "第一部分：背景信息",
    description: "请提供一些关于您和您的住区的基本信息。这将帮助我们更好地理解不同类型住区的热舒适感知差异。",
    elements: demographicQuestions
  },
  
  // ========================================
  // 📄 PAGE 2: THERMAL AFFORDANCE ASSESSMENT (VATA Core)
  // ========================================
  {
    name: "thermal_affordance", 
    title: "第二部分：热舒适感知评估",
    description: "请根据您的直觉感受，评估下列街道环境的热舒适性。",
    elements: [
      {
        type: "expression",
        name: "thermal_instruction",
        title: "在本部分中，您将看到不同的街道环境。请想象您在这些街道上步行的感受，选择更舒适的环境。",
        description: "请考虑阴影、绿化、建筑布局等因素对热舒适的影响。"
      },
      
      // Core VATA Question
      {
        type: "imagepicker",
        name: "thermal_affordance",
        title: "热舒适性总体评估",
        description: "哪个街道环境您感知具有更舒适的户外热环境？",
        isRequired: true,
        choices: displayedImages.thermal_affordance,
        imageFit: "cover",
        multiSelect: false
      },
      
      // Microclimate Inference Questions
      {
        type: "imagepicker",
        name: "temperature_intensity",
        title: "温度强度感知",
        description: "哪个街道环境您感知温度更高？",
        isRequired: true,
        choices: displayedImages.temperature_intensity,
        imageFit: "cover",
        multiSelect: false
      },
      
      {
        type: "imagepicker",
        name: "sunshine_intensity",
        title: "辐射感知",
        description: "哪个街道环境您感知辐射更强烈？",
        isRequired: true,
        choices: displayedImages.sunshine_intensity,
        imageFit: "cover",
        multiSelect: false
      },
      
      {
        type: "imagepicker",
        name: "humidity_inference",
        title: "湿度感知",
        description: "哪个街道环境您感知湿度更高？",
        isRequired: true,
        choices: displayedImages.humidity_inference,
        imageFit: "cover",
        multiSelect: false
      },
      
      {
        type: "imagepicker",
        name: "wind_inference",
        title: "风速感知",
        description: "哪个街道环境您感知风速更大？",
        isRequired: true,
        choices: displayedImages.wind_inference,
        imageFit: "cover",
        multiSelect: false
      }
      
      // 🔧 TO ADD NEW PERCEPTION QUESTIONS:
      // 1. Add the question name to generateQuestionImages() at the top
      // 2. Copy one of the questions above and modify the name, title, and description
      // 3. Don't forget the comma after the previous question!
    ]
  },
  
  // ========================================
  // 📄 PAGE 3: ENVIRONMENTAL ASSESSMENT
  // ========================================
  {
    name: "environmental_assessment",
    title: "第三部分：环境要素评估",
    description: "请评估下列街道环境的各种物理要素。",
    elements: [
      {
        type: "expression",
        name: "environmental_instruction",
        title: "请比较两张图片，选择在每个维度上更突出的街道环境。"
      },
      
      {
        type: "imagepicker",
        name: "traffic_flow",
        title: "交通流量感知",
        description: "哪个街道环境传达出更高的交通流量？",
        isRequired: true,
        choices: displayedImages.traffic_flow,
        imageFit: "cover",
        multiSelect: false
      },
      
      {
        type: "imagepicker",
        name: "greenery_rate",
        title: "绿化率感知",
        description: "哪个街道环境具有更高的绿化率？",
        isRequired: true,
        choices: displayedImages.greenery_rate,
        imageFit: "cover",
        multiSelect: false
      },
      
      {
        type: "imagepicker",
        name: "shading_area",
        title: "阴影区域感知",
        description: "哪个街道环境提供更多的阴影区域？",
        isRequired: true,
        choices: displayedImages.shading_area,
        imageFit: "cover",
        multiSelect: false
      },
      
      {
        type: "imagepicker",
        name: "material_comfort",
        title: "建筑材料舒适度",
        description: "哪个街道环境的建筑材料看起来更舒适？",
        isRequired: true,
        choices: displayedImages.material_comfort,
        imageFit: "cover",
        multiSelect: false
      }
    ]
  },
  
  // ========================================
  // 📄 PAGE 4: DESIGN QUALITY ASSESSMENT
  // ========================================
  {
    name: "design_quality",
    title: "第四部分：空间设计质量",
    description: "请评估街道空间的设计质量和空间特征。",
    elements: [
      {
        type: "imagepicker",
        name: "imageability",
        title: "可识别性",
        description: "哪个街道环境更具特色和记忆点？",
        isRequired: true,
        choices: displayedImages.imageability,
        imageFit: "cover",
        multiSelect: false
      },
      
      {
        type: "imagepicker",
        name: "enclosure",
        title: "围合度",
        description: "哪个街道环境具有更好的空间围合感？",
        isRequired: true,
        choices: displayedImages.enclosure,
        imageFit: "cover",
        multiSelect: false
      },
      
      {
        type: "imagepicker",
        name: "human_scale",
        title: "人性尺度",
        description: "哪个街道环境更适合人的步行尺度？",
        isRequired: true,
        choices: displayedImages.human_scale,
        imageFit: "cover",
        multiSelect: false
      },
      
      {
        type: "imagepicker",
        name: "transparency",
        title: "通透性",
        description: "哪个街道环境的视觉通透性更好？",
        isRequired: true,
        choices: displayedImages.transparency,
        imageFit: "cover",
        multiSelect: false
      },
      
      {
        type: "imagepicker",
        name: "complexity",
        title: "复杂性",
        description: "哪个街道环境的视觉复杂性更高？",
        isRequired: true,
        choices: displayedImages.complexity,
        imageFit: "cover",
        multiSelect: false
      }
    ]
  },
  
  // ========================================
  // 📄 PAGE 5: EMOTIONAL RESPONSE ASSESSMENT
  // ========================================
  {
    name: "emotional_response",
    title: "第五部分：情感反应评估",
    description: "请评估街道环境引发的情感反应。",
    elements: [
      {
        type: "imagepicker",
        name: "safe_feeling",
        title: "安全感",
        description: "哪个街道环境让您感觉更安全？",
        isRequired: true,
        choices: displayedImages.safe_feeling,
        imageFit: "cover",
        multiSelect: false
      },
      
      {
        type: "imagepicker",
        name: "beautiful_feeling",
        title: "美观感",
        description: "哪个街道环境让您感觉更美观？",
        isRequired: true,
        choices: displayedImages.beautiful_feeling,
        imageFit: "cover",
        multiSelect: false
      },
      
      {
        type: "imagepicker",
        name: "lively_feeling",
        title: "活力感",
        description: "哪个街道环境让您感觉更有活力？",
        isRequired: true,
        choices: displayedImages.lively_feeling,
        imageFit: "cover",
        multiSelect: false
      },
      
      {
        type: "imagepicker",
        name: "wealthy_feeling",
        title: "富裕感",
        description: "哪个街道环境让您感觉更富裕？",
        isRequired: true,
        choices: displayedImages.wealthy_feeling,
        imageFit: "cover",
        multiSelect: false
      },
      
      {
        type: "imagepicker",
        name: "boring_feeling",
        title: "无聊感",
        description: "哪个街道环境让您感觉更无聊？",
        isRequired: true,
        choices: displayedImages.boring_feeling,
        imageFit: "cover",
        multiSelect: false
      },
      
      {
        type: "imagepicker",
        name: "depressing_feeling",
        title: "压抑感",
        description: "哪个街道环境让您感觉更压抑？",
        isRequired: true,
        choices: displayedImages.depressing_feeling,
        imageFit: "cover",
        multiSelect: false
      }
    ]
  },
  
  // ========================================
  // 📄 PAGE 6: FEATURE IMPORTANCE RANKING
  // ========================================
  {
    name: "feature_ranking",
    title: "第六部分：热舒适影响因素重要性排序",
    description: "请按照对您的热舒适感受的重要性，对以下因素进行排序。",
    elements: [
      {
        type: "image", 
        name: "ranking_image",
        imageLink: displayedImages.feature_ranking[0]?.imageLink,
        imageFit: "cover",
        imageHeight: "300px",
        imageWidth: "100%"
      },
      {
        type: "ranking",
        name: "thermal_comfort_factors",
        title: "请拖拽排序以下影响热舒适的因素，从最重要（顶部）到最不重要（底部）：",
        isRequired: true,
        choices: [
          { value: "shading", text: "阴影遮阳" },
          { value: "greenery", text: "绿化植被" },
          { value: "ventilation", text: "自然通风" },
          { value: "building_layout", text: "建筑密度和布局" },
          { value: "water_features", text: "水体或喷泉" },
          { value: "pavement_material", text: "环境材料和颜色" },
          { value: "street_width", text: "街道宽度和开放性" }
        ]
      }
    ]
  }
];

// ========================================
// 🔧 SURVEY CONFIGURATION
// ========================================
// Main survey settings and structure

export const surveyJson = {
  // 🔧 SURVEY TITLE AND DESCRIPTION
  title: "住区街景热舒适感知调研",
  description: "您好！我们正在进行一项关于不同类型住区街道热舒适感知的研究。该研究旨在了解哪些空间要素影响人们的热舒适感受。您的参与将为构建更舒适、可持续的城市居住环境提供科学依据。调研预计需要10-15分钟。",
  
  // 🔧 SURVEY STRUCTURE
  pages: surveyPages, // Uses the pages defined above
  
  // 🔧 DISPLAY SETTINGS - Customize survey appearance
  showQuestionNumbers: "off", // "on", "off", or "onPage" - Show question numbers
  showProgressBar: "aboveheader", // "top", "bottom", "aboveheader", "belowheader", or "off"
  progressBarType: "questions", // "pages" or "questions" - Progress calculation method
  autoGrowComment: true, // Auto-expand text areas as user types
  showPreviewBeforeComplete: "noPreview" // 去掉预览功能，必答题完成即可提交
  
  // 🔧 ADDITIONAL SETTINGS YOU CAN ADD:
  // completedHtml: "<h3>Thank you for your participation!</h3>", // Custom completion message
  // requiredText: "*", // Symbol for required questions
  // questionErrorLocation: "bottom", // "top" or "bottom" - Where to show validation errors
  // showCompletedPage: false, // Skip the completion page
}; 