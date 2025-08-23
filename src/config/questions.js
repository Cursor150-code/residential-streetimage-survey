import { getRandomImages } from './streetImages.js';
import { getCurrentLanguage } from './languages.js';

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

export const getDemographicQuestions = (currentLanguage = 'zh') => {
  const t = getCurrentLanguage(currentLanguage);
  
  return [
    // 🔧 RESIDENTIAL COMMUNITY TYPE - 8 comprehensive options
    {
      name: "community_type",
      title: t.communityType,
      type: "radiogroup",
      choices: [
        t.highDense,
        t.highOpen,
        t.midDense,
        t.midOpen,
        t.lowDense,
        t.lowOpen,
        t.mixed,
        t.uncertain
      ],
      isRequired: true
    },
    
    // 🔧 GENDER QUESTION
    {
      name: "gender",
      title: t.gender,
      type: "radiogroup",
      choices: [
        t.male,
        t.female
      ],
      isRequired: true
    },
    
    // 🔧 AGE QUESTION
    {
      name: "age",
      title: t.age,
      type: "radiogroup",
      choices: [
        t.under18,
        t.age18to24,
        t.age25to30,
        t.age31to40,
        t.age41to50,
        t.age51to60,
        t.over61
      ],
      isRequired: true
    },
    
    // 🔧 RESIDENCE DURATION
    {
      name: "residence_duration",
      title: t.residenceDuration,
      type: "radiogroup",
      choices: [
        t.lessThan1Year,
        t.oneToThreeYears,
        t.threeToFiveYears,
        t.fiveToTenYears,
        t.moreThanTenYears
      ],
      isRequired: true
    },
    
    // 🔧 OUTDOOR ACTIVITY FREQUENCY
    {
      name: "outdoor_activity",
      title: t.outdoorActivity,
      type: "radiogroup",
      choices: [
        t.daily,
        t.severalTimesWeek,
        t.onceWeek,
        t.severalTimesMonth,
        t.rarely,
        t.never
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
};

// ========================================
// 📋 MAIN SURVEY STRUCTURE
// ========================================
// The survey is organized into 6 parts (pages). Each page contains multiple questions.
// 🔧 TO CUSTOMIZE: Modify the pages below or add/remove pages as needed.

export const getSurveyPages = (currentLanguage = 'zh') => {
  const t = getCurrentLanguage(currentLanguage);
  const demographicQuestions = getDemographicQuestions(currentLanguage);
  
  return [
  
    // ========================================
    // 📄 PAGE 1: DEMOGRAPHIC QUESTIONS
    // ========================================
    {
      name: "demographics",
      title: t.demographics,
      description: t.demographicsDesc,
      elements: demographicQuestions
    },
  
    // ========================================
    // 📄 PAGE 2: THERMAL AFFORDANCE ASSESSMENT (VATA Core)
    // ========================================
    {
      name: "thermal_affordance", 
      title: t.thermalAffordance,
      description: t.thermalAffordanceDesc,
      elements: [
        {
          type: "expression",
          name: "thermal_instruction",
          title: t.thermalInstruction,
          description: t.thermalInstructionDesc
        },
      
        // Core VATA Question
        {
          type: "imagepicker",
          name: "thermal_affordance",
          title: t.thermalComfort,
          description: t.thermalComfortDesc,
          isRequired: true,
          choices: displayedImages.thermal_affordance,
          imageFit: "cover",
          multiSelect: false
        },
        
        // Microclimate Inference Questions
        {
          type: "imagepicker",
          name: "temperature_intensity",
          title: t.temperatureIntensity,
          description: t.temperatureIntensityDesc,
          isRequired: true,
          choices: displayedImages.temperature_intensity,
          imageFit: "cover",
          multiSelect: false
        },
        
        {
          type: "imagepicker",
          name: "sunshine_intensity",
          title: t.sunshineIntensity,
          description: t.sunshineIntensityDesc,
          isRequired: true,
          choices: displayedImages.sunshine_intensity,
          imageFit: "cover",
          multiSelect: false
        },
        
        {
          type: "imagepicker",
          name: "humidity_inference",
          title: t.humidityInference,
          description: t.humidityInferenceDesc,
          isRequired: true,
          choices: displayedImages.humidity_inference,
          imageFit: "cover",
          multiSelect: false
        },
        
        {
          type: "imagepicker",
          name: "wind_inference",
          title: t.windInference,
          description: t.windInferenceDesc,
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
      title: t.environmentalAssessment,
      description: t.environmentalAssessmentDesc,
      elements: [
        {
          type: "expression",
          name: "environmental_instruction",
          title: t.environmentalInstruction
        },
      
        {
          type: "imagepicker",
          name: "traffic_flow",
          title: t.trafficFlow,
          description: t.trafficFlowDesc,
          isRequired: true,
          choices: displayedImages.traffic_flow,
          imageFit: "cover",
          multiSelect: false
        },
        
        {
          type: "imagepicker",
          name: "greenery_rate",
          title: t.greeneryRate,
          description: t.greeneryRateDesc,
          isRequired: true,
          choices: displayedImages.greenery_rate,
          imageFit: "cover",
          multiSelect: false
        },
        
        {
          type: "imagepicker",
          name: "shading_area",
          title: t.shadingArea,
          description: t.shadingAreaDesc,
          isRequired: true,
          choices: displayedImages.shading_area,
          imageFit: "cover",
          multiSelect: false
        },
        
        {
          type: "imagepicker",
          name: "material_comfort",
          title: t.materialComfort,
          description: t.materialComfortDesc,
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
      title: t.designQuality,
      description: t.designQualityDesc,
      elements: [
        {
          type: "imagepicker",
          name: "imageability",
          title: t.imageability,
          description: t.imageabilityDesc,
          isRequired: true,
          choices: displayedImages.imageability,
          imageFit: "cover",
          multiSelect: false
        },
        
        {
          type: "imagepicker",
          name: "enclosure",
          title: t.enclosure,
          description: t.enclosureDesc,
          isRequired: true,
          choices: displayedImages.enclosure,
          imageFit: "cover",
          multiSelect: false
        },
        
        {
          type: "imagepicker",
          name: "human_scale",
          title: t.humanScale,
          description: t.humanScaleDesc,
          isRequired: true,
          choices: displayedImages.human_scale,
          imageFit: "cover",
          multiSelect: false
        },
        
        {
          type: "imagepicker",
          name: "transparency",
          title: t.transparency,
          description: t.transparencyDesc,
          isRequired: true,
          choices: displayedImages.transparency,
          imageFit: "cover",
          multiSelect: false
        },
        
        {
          type: "imagepicker",
          name: "complexity",
          title: t.complexity,
          description: t.complexityDesc,
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
      title: t.emotionalResponse,
      description: t.emotionalResponseDesc,
      elements: [
        {
          type: "imagepicker",
          name: "safe_feeling",
          title: t.safeFeeling,
          description: t.safeFeelingDesc,
          isRequired: true,
          choices: displayedImages.safe_feeling,
          imageFit: "cover",
          multiSelect: false
        },
        
        {
          type: "imagepicker",
          name: "beautiful_feeling",
          title: t.beautifulFeeling,
          description: t.beautifulFeelingDesc,
          isRequired: true,
          choices: displayedImages.beautiful_feeling,
          imageFit: "cover",
          multiSelect: false
        },
        
        {
          type: "imagepicker",
          name: "lively_feeling",
          title: t.livelyFeeling,
          description: t.livelyFeelingDesc,
          isRequired: true,
          choices: displayedImages.lively_feeling,
          imageFit: "cover",
          multiSelect: false
        },
        
        {
          type: "imagepicker",
          name: "wealthy_feeling",
          title: t.wealthyFeeling,
          description: t.wealthyFeelingDesc,
          isRequired: true,
          choices: displayedImages.wealthy_feeling,
          imageFit: "cover",
          multiSelect: false
        },
        
        {
          type: "imagepicker",
          name: "boring_feeling",
          title: t.boringFeeling,
          description: t.boringFeelingDesc,
          isRequired: true,
          choices: displayedImages.boring_feeling,
          imageFit: "cover",
          multiSelect: false
        },
        
        {
          type: "imagepicker",
          name: "depressing_feeling",
          title: t.depressingFeeling,
          description: t.depressingFeelingDesc,
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
      title: t.featureRanking,
      description: t.featureRankingDesc,
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
          title: t.thermalComfortFactors,
          isRequired: true,
          choices: [
            { value: "shading", text: t.shading },
            { value: "greenery", text: t.greenery },
            { value: "ventilation", text: t.ventilation },
            { value: "building_layout", text: t.buildingLayout },
            { value: "water_features", text: t.waterFeatures },
            { value: "pavement_material", text: t.pavementMaterial },
            { value: "street_width", text: t.streetWidth }
          ]
        }
      ]
    }
  ];
};

// ========================================
// 🔧 SURVEY CONFIGURATION
// ========================================
// Main survey settings and structure

export const getSurveyJson = (currentLanguage = 'zh') => {
  const t = getCurrentLanguage(currentLanguage);
  const surveyPages = getSurveyPages(currentLanguage);
  
  return {
    // 🔧 SURVEY TITLE AND DESCRIPTION
    title: t.surveyTitle,
    description: t.surveyDescription,
    
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
};

// Backward compatibility - default Chinese
export const surveyJson = getSurveyJson('zh'); 