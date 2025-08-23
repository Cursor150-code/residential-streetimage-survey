import React from 'react';
import { getCurrentLanguage } from '../config/languages';
import './LanguageSwitcher.css';

const LanguageSwitcher = ({ currentLanguage, onLanguageChange }) => {
  const t = getCurrentLanguage(currentLanguage);
  
  const handleLanguageSwitch = () => {
    const newLanguage = currentLanguage === 'zh' ? 'en' : 'zh';
    onLanguageChange(newLanguage);
  };

  return (
    <div className="language-switcher">
      <button 
        className="language-switch-btn"
        onClick={handleLanguageSwitch}
        title={currentLanguage === 'zh' ? 'Switch to English' : '切换到中文'}
      >
        <span className="language-flag">
          {currentLanguage === 'zh' ? '🇺🇸' : '🇨🇳'}
        </span>
        <span className="language-text">
          {t.languageSwitch}
        </span>
      </button>
    </div>
  );
};

export default LanguageSwitcher;