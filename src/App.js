import React, { useState, useEffect } from "react";
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import "survey-core/defaultV2.min.css";
import "./survey-custom.css";
import "./App.css";
import { saveSurveyResponse } from './lib/supabase';
import { getSurveyJson, displayedImages } from './config/questions';
import { surveyConfig } from './config/surveyConfig';
import { themeJson } from "./theme";
import { getCurrentLanguage } from './config/languages';
import LanguageSwitcher from './components/LanguageSwitcher';

export default function App() {
  // Language state management
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    // Get language from localStorage or default to 'zh'
    return localStorage.getItem('survey-language') || 'zh';
  });
  
  const [model, setModel] = useState(null);
  
  // Initialize or update survey model when language changes
  useEffect(() => {
    const surveyJson = getSurveyJson(currentLanguage);
    const newModel = new Model(surveyJson);
    
    // Apply theme
    newModel.applyTheme(themeJson);
    
    // Apply survey configuration (keeping original config structure)
    newModel.logo = surveyConfig.logo;
    newModel.logoPosition = surveyConfig.logoPosition;
    
    // Apply settings
    Object.keys(surveyConfig.settings).forEach(key => {
      newModel[key] = surveyConfig.settings[key];
    });

    // Handle survey completion
    newModel.onComplete.add(async (survey, options) => {
      const responses = survey.data;
      const t = getCurrentLanguage(currentLanguage);
      
      // Combine user responses with displayed images information
      const completeData = {
        responses: responses,
        displayed_images: displayedImages,
        survey_metadata: {
          completion_time: new Date().toISOString(),
          user_agent: navigator.userAgent,
          screen_resolution: `${window.screen.width}x${window.screen.height}`,
          survey_version: "1.0",
          language: currentLanguage
        }
      };
      
      console.log("Survey completed with complete data:", completeData);
      
      // Save to Supabase
      const result = await saveSurveyResponse(completeData);
      
      if (result.success) {
        console.log("Survey response saved successfully!");
        alert(t.thankYou);
      } else {
        console.error("Failed to save survey response:", result.error);
        alert(t.saveError);
      }
    });
    
    setModel(newModel);
  }, [currentLanguage]);
  
  // Handle language change
  const handleLanguageChange = (newLanguage) => {
    setCurrentLanguage(newLanguage);
    localStorage.setItem('survey-language', newLanguage);
  };
  
  if (!model) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className="app-container">
      <LanguageSwitcher 
        currentLanguage={currentLanguage}
        onLanguageChange={handleLanguageChange}
      />
      <Survey model={model} />
    </div>
  );
}
