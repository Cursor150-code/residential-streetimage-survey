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
    // 🔧 PERCEPTION QUESTIONS (Part 2)
    // Format: question_name: getRandomImages("question_name", number_of_images)
    safety_perception: getRandomImages("safety_perception", 2),           // 2 images, choose 1
    attractiveness_perception: getRandomImages("attractiveness_perception", 2), // 2 images, choose 1
    walkability_perception: getRandomImages("walkability_perception", 2),       // 2 images, choose 1
    liveliness_perception: getRandomImages("liveliness_perception", 4),         // 4 images, choose 1
    relaxation_perception: getRandomImages("relaxation_perception", 4),         // 4 images, choose 1
    cleanliness_perception: getRandomImages("cleanliness_perception", 4),       // 4 images, choose 1
    
    // 🔧 OTHER QUESTIONS (Parts 3-6)
    // Each shows 1 random image alongside the question
    comfort_rating: getRandomImages("comfort_rating", 1),     // Part 3: Rating scale
    street_elements: getRandomImages("street_elements", 1),   // Part 4: Checkbox elements
    feature_ranking: getRandomImages("feature_ranking", 1),   // Part 5: Ranking
    open_feedback: getRandomImages("open_feedback", 1)        // Part 6: Text feedback
    
    // 🔧 TO ADD NEW IMAGE QUESTIONS:
    // 1. Add a new line here: your_question_name: getRandomImages("your_question_name", count),
    // 2. Use displayedImages.your_question_name in the question definition below
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
  // 🔧 AGE QUESTION - Multiple choice
  // TO MODIFY: Change age ranges in the choices array
  {
    name: "age",
    title: "您的年龄段是？",
    type: "radiogroup",
    choices: [
      "18岁以下",
      "18-24岁", 
      "25-34岁",
      "35-44岁", 
      "45-54岁",
      "55-64岁",
      "65岁或以上"
    ],
    isRequired: false // Keep false to make optional
  },
  
  // 🔧 LOCATION QUESTION - Text input
  // TO MODIFY: Change the title text or make it more specific
  {
    name: "location",
    title: "您来自哪里？（城市，国家）",
    type: "text", // Use "text" for single line, "comment" for multi-line
    isRequired: false
  },
  
  // 🔧 INCOME QUESTION - Multiple choice
  // TO MODIFY: Adjust income ranges for your target population/currency
  {
    name: "income",
    title: "您的家庭收入水平是？",
    type: "radiogroup", 
    choices: [
      "5万元以下",
      "5万-10万元",
      "10万-20万元", 
      "20万-30万元",
      "30万元以上",
      "不便透露"
    ],
    isRequired: false
  },
  
  // 🔧 EDUCATION QUESTION - Multiple choice
  // TO MODIFY: Adjust education levels for your region's system
  {
    name: "education",
    title: "您的最高学历是？",
    type: "radiogroup",
    choices: [
      "高中或以下",
      "大专/大学在读",
      "本科学历", 
      "硕士学历",
      "博士学历",
      "其他"
    ],
    isRequired: false
  },
  
  // 🔧 OUTDOOR ACTIVITY QUESTION - Multiple choice
  // TO MODIFY: Change to any frequency-based question relevant to your research
  {
    name: "outdoor_activity",
    title: "您多久参与一次户外活动？",
    type: "radiogroup",
    choices: [
      "每天",
      "每周几次",
      "每周一次",
      "每月几次", 
      "很少",
      "从不"
    ],
    isRequired: false
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
    title: "第一部分：背景信息（可选）", // 🔧 Change page title here
    description: "请简单介绍一下您自己。所有问题均为可选，可以跳过。", // 🔧 Change page description
    elements: demographicQuestions // Uses the demographic questions defined above
  },
  
  // ========================================
  // 📄 PAGE 2: STREET PERCEPTION QUESTIONS  
  // ========================================
  // This page contains 6 image-based perception questions
  {
    name: "street_perception", 
    title: "第二部分：街道感知", // 🔧 Change page title here
    description: "请基于不同维度评估不同的街道环境。", // 🔧 Change page description
    elements: [
      // 🔧 PAGE INSTRUCTIONS - Displayed at the top of the page
      {
        type: "expression",
        name: "perception_instruction",
        title: "在本部分中，您将看到不同组合的街道图片。请选择最符合每个问题的图片。", // 🔧 Change instruction text
        description: "请仔细查看每张图片。" // 🔧 Change sub-instruction
      },
      
      // 🔧 PERCEPTION QUESTION 1: Safety (2 choose 1)
      // TO MODIFY: Change title, description, or perception type
      {
        type: "imagepicker",
        name: "safety_perception", // 🔧 Must match the name in generateQuestionImages()
        title: "安全感知", // 🔧 Change question title
        description: "您认为哪个街道环境最安全？", // 🔧 Change question description
        isRequired: true, // 🔧 Set to false to make optional
        choices: displayedImages.safety_perception, // Uses pre-generated images
        imageFit: "cover", // Keep as "cover" for best display
        multiSelect: false // Keep false for "choose 1", true for "choose multiple"
      },
      
      // 🔧 PERCEPTION QUESTION 2: Attractiveness (2 choose 1)
      // TO MODIFY: Replace "attractiveness" with your own perception (e.g., "beauty", "appeal")
      {
        type: "imagepicker",
        name: "attractiveness_perception", // 🔧 Change name and update in generateQuestionImages()
        title: "视觉吸引力", // 🔧 Change question title
        description: "您认为哪个街道环境最具视觉吸引力？", // 🔧 Change question description
        isRequired: true,
        choices: displayedImages.attractiveness_perception,
        imageFit: "cover",
        multiSelect: false
      },
      
      // 🔧 PERCEPTION QUESTION 3: Walkability (2 choose 1)
      {
        type: "imagepicker", 
        name: "walkability_perception", // 🔧 Change name and update in generateQuestionImages()
        title: "步行适宜性", // 🔧 Change question title
        description: "您认为哪个街道环境最适合步行？", // 🔧 Change question description
        isRequired: true,
        choices: displayedImages.walkability_perception,
        imageFit: "cover",
        multiSelect: false
      },
      
      // 🔧 PERCEPTION QUESTION 4: Liveliness (4 choose 1)
      {
        type: "imagepicker",
        name: "liveliness_perception", // 🔧 Change name and update in generateQuestionImages()
        title: "活力与生机", // 🔧 Change question title
        description: "您认为哪个街道环境最具活力和生机？", // 🔧 Change question description
        isRequired: true,
        choices: displayedImages.liveliness_perception,
        imageFit: "cover",
        multiSelect: false
      },
      
      // 🔧 PERCEPTION QUESTION 5: Relaxation (4 choose 1)
      {
        type: "imagepicker",
        name: "relaxation_perception", // 🔧 Change name and update in generateQuestionImages()
        title: "放松与宁静", // 🔧 Change question title
        description: "您认为哪个街道环境最令人放松平静？", // 🔧 Change question description
        isRequired: true,
        choices: displayedImages.relaxation_perception,
        imageFit: "cover",
        multiSelect: false
      },
      
      // 🔧 PERCEPTION QUESTION 6: Cleanliness (4 choose 1)
      {
        type: "imagepicker",
        name: "cleanliness_perception", // 🔧 Change name and update in generateQuestionImages()
        title: "清洁与维护", // 🔧 Change question title
        description: "您认为哪个街道环境最清洁整洁？", // 🔧 Change question description
        isRequired: true,
        choices: displayedImages.cleanliness_perception,
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
  // 📄 PAGE 3: LIKERT SCALE RATING
  // ========================================
  // Shows 1 image with a rating scale question
  {
    name: "comfort_rating",
    title: "第三部分：舒适度评分", // 🔧 Change page title
    description: "请评分您在这个街道环境中的舒适感。", // 🔧 Change page description
    elements: [
      // 🔧 IMAGE DISPLAY - Shows 1 random image
      {
        type: "image",
        name: "comfort_image",
        imageLink: displayedImages.comfort_rating[0]?.imageLink, // Uses pre-generated image
        imageFit: "cover", // Keep as "cover"
        imageHeight: "300px", // 🔧 Adjust image height
        imageWidth: "100%" // Keep as "100%"
      },
      // 🔧 RATING QUESTION - 1-5 scale
      {
        type: "radiogroup", // Keep as "radiogroup" for rating scale
        name: "comfort_level", // 🔧 Change question name
        title: "在这条街道上步行您会感到多舒适？", // 🔧 Change question text
        isRequired: true, // 🔧 Set to false to make optional
        choices: [
          { value: 1, text: "非常不舒适" }, // 🔧 Change scale labels
          { value: 2, text: "不舒适" },
          { value: 3, text: "一般" },
          { value: 4, text: "舒适" },
          { value: 5, text: "非常舒适" }
          // 🔧 TO ADD MORE SCALE POINTS: Add more choices with value 6, 7, etc.
        ]
      }
    ]
  },
  
  // ========================================
  // 📄 PAGE 4: CHECKBOX QUESTIONS (Select Multiple)
  // ========================================
  // Shows 1 image with checkbox options for element identification
  {
    name: "street_elements",
    title: "第四部分：街道元素", // 🔧 Change page title
    description: "请识别您在这个街道环境中注意到的元素。", // 🔧 Change page description
    elements: [
      // 🔧 IMAGE DISPLAY - Shows 1 random image
      {
        type: "image", 
        name: "elements_image",
        imageLink: displayedImages.street_elements[0]?.imageLink, // Uses pre-generated image
        imageFit: "cover",
        imageHeight: "300px", // 🔧 Adjust image height
        imageWidth: "100%"
      },
      // 🔧 CHECKBOX QUESTION - Select multiple options
      {
        type: "checkbox", // Keep as "checkbox" for multiple selection
        name: "visible_elements", // 🔧 Change question name
        title: "您在这条街道中注意到了哪些元素？（可多选）", // 🔧 Change question text
        isRequired: true, // 🔧 Set to false to make optional
        choices: [
          // 🔧 MODIFY THESE OPTIONS - Add/remove/change street elements
          "树木和植被",
          "街道家具（长凳、路灯等）",
          "自行车道", 
          "人行横道",
          "公共艺术或装饰",
          "商业建筑",
          "住宅建筑",
          "停车位",
          "公共交通站点",
          "户外餐饮区域"
          // 🔧 TO ADD MORE OPTIONS: Add more strings to this array
        ]
      }
    ]
  },
  
  // ========================================
  // 📄 PAGE 5: RANKING QUESTIONS (Drag & Drop)
  // ========================================
  // Shows 1 image with drag-and-drop ranking question
  {
    name: "feature_ranking",
    title: "第五部分：特征重要性排序", // 🔧 Change page title
    description: "请观察这个街道环境，并按重要性对创建愉快步行体验的特征进行排序。", // 🔧 Change page description
    elements: [
      // 🔧 IMAGE DISPLAY - Shows 1 random image
      {
        type: "image", 
        name: "ranking_image",
        imageLink: displayedImages.feature_ranking[0]?.imageLink, // Uses pre-generated image
        imageFit: "cover",
        imageHeight: "300px", // 🔧 Adjust image height
        imageWidth: "100%"
      },
      // 🔧 RANKING QUESTION - Drag and drop to reorder
      {
        type: "ranking", // Keep as "ranking" for drag-and-drop functionality
        name: "street_features", // 🔧 Change question name
        title: "基于上面的图片，请拖拽排序这些特征，从最重要（顶部）到最不重要（底部）：", // 🔧 Change question text
        isRequired: true, // 🔧 Set to false to make optional
        choices: [
          // 🔧 MODIFY THESE RANKING OPTIONS - Each needs "value" and "text"
          { value: "safety", text: "安全性" },
          { value: "greenery", text: "树木和绿化" },
          { value: "walkability", text: "人行道和步行适宜性" },
          { value: "aesthetics", text: "视觉吸引力和美观" },
          { value: "amenities", text: "街道设施和便民服务" }
          // 🔧 TO ADD MORE OPTIONS: Add more objects with value and text properties
        ]
      }
    ]
  },
  
  // ========================================
  // 📄 PAGE 6: TEXT INPUT QUESTIONS (Open-ended)
  // ========================================
  // Shows 1 image with open-ended text response
  {
    name: "open_feedback",
    title: "第六部分：您的想法", // 🔧 Change page title
    description: "最后，请分享您对什么构成优秀街道环境的想法。", // 🔧 Change page description
    elements: [
      // 🔧 IMAGE DISPLAY - Shows 1 random image
      {
        type: "image", 
        name: "feedback_image",
        imageLink: displayedImages.open_feedback[0]?.imageLink, // Uses pre-generated image
        imageFit: "cover",
        imageHeight: "300px", // 🔧 Adjust image height
        imageWidth: "100%"
      },
      // 🔧 TEXT INPUT QUESTION - Open-ended response
      {
        type: "comment", // Use "comment" for multi-line text, "text" for single line
        name: "general_feedback", // 🔧 Change question name
        title: "看到这条街道，什么使街道环境对您有吸引力？（可选）", // 🔧 Change question text
        description: "请分享您对街道设计、步行适宜性或其他对您重要的方面的想法。", // 🔧 Change question description
        isRequired: false, // 🔧 Set to true to make required
        maxLength: 500 // 🔧 Adjust character limit (or remove for unlimited)
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
  title: "住区街景图片热感知", // 🔧 Change main survey title
  description: "这项调研将帮助我们了解人们对不同住区街道环境的感知。您的回答将有助于改善住区设计。", // 🔧 Change survey description
  
  // 🔧 SURVEY STRUCTURE
  pages: surveyPages, // Uses the pages defined above
  
  // 🔧 DISPLAY SETTINGS - Customize survey appearance
  showQuestionNumbers: "off", // "on", "off", or "onPage" - Show question numbers
  showProgressBar: "aboveheader", // "top", "bottom", "aboveheader", "belowheader", or "off"
  progressBarType: "questions", // "pages" or "questions" - Progress calculation method
  autoGrowComment: true, // Auto-expand text areas as user types
  showPreviewBeforeComplete: "showAllQuestions" // "showAllQuestions", "showAnsweredQuestions", or "noPreview"
  
  // 🔧 ADDITIONAL SETTINGS YOU CAN ADD:
  // completedHtml: "<h3>Thank you for your participation!</h3>", // Custom completion message
  // requiredText: "*", // Symbol for required questions
  // questionErrorLocation: "bottom", // "top" or "bottom" - Where to show validation errors
  // showCompletedPage: false, // Skip the completion page
}; 