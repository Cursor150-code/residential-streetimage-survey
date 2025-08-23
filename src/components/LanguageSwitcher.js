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
    <button 
      className="language-switcher language-switch-btn"
      onClick={handleLanguageSwitch}
      title={currentLanguage === 'zh' ? 'Switch to English' : '切换到中文'}
      style={{
        position: 'absolute',
        top: '10px',
        left: '10px',
        zIndex: 999999,
        background: 'none',
        border: 'none',
        margin: 0,
        padding: '2px 4px',
        fontSize: '10px',
        color: '#007bff',
        textDecoration: 'underline',
        cursor: 'pointer'
      }}
    >
      <span style={{fontSize: '10px', marginRight: '2px'}}>
        {currentLanguage === 'zh' ? '🇺🇸' : '🇨🇳'}
      </span>
      <span style={{fontSize: '10px'}}>
        {t.languageSwitch}
      </span>
    </button>
  );
};

export default LanguageSwitcher;