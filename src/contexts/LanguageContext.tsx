
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '@/i18n/i18n';

interface LanguageContextType {
  currentLanguage: string;
  changeLanguage: (lang: string) => void;
  languageOptions: { value: string; label: string }[];
}

const LanguageContext = createContext<LanguageContextType>({
  currentLanguage: 'en',
  changeLanguage: () => {},
  languageOptions: [],
});

export const useLanguage = () => useContext(LanguageContext);

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [isI18nReady, setIsI18nReady] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');

  // Wait for i18n to be ready before using useTranslation
  useEffect(() => {
    const checkI18nReady = () => {
      if (i18n.isInitialized) {
        setIsI18nReady(true);
        setCurrentLanguage(i18n.language || 'en');
      } else {
        // Wait for i18n to initialize
        i18n.on('initialized', () => {
          setIsI18nReady(true);
          setCurrentLanguage(i18n.language || 'en');
        });
      }
    };

    checkI18nReady();

    return () => {
      i18n.off('initialized');
    };
  }, []);

  if (!isI18nReady) {
    // Provide fallback values while i18n is initializing
    const fallbackLanguageOptions = [
      { value: 'en', label: 'English' },
      { value: 'es', label: 'Español' },
      { value: 'zh-CN', label: '中文（简体）' },
    ];

    const fallbackChangeLanguage = (lang: string) => {
      i18n.changeLanguage(lang);
      setCurrentLanguage(lang);
    };

    return (
      <LanguageContext.Provider 
        value={{ 
          currentLanguage, 
          changeLanguage: fallbackChangeLanguage, 
          languageOptions: fallbackLanguageOptions 
        }}
      >
        {children}
      </LanguageContext.Provider>
    );
  }

  return <I18nReadyProvider>{children}</I18nReadyProvider>;
};

// Separate component that uses useTranslation only when i18n is ready
const I18nReadyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { i18n, t } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language || 'en');

  // Language options
  const languageOptions = [
    { value: 'en', label: t('language.english') },
    { value: 'es', label: t('language.spanish') },
    { value: 'zh-CN', label: t('language.chinese.simplified') },
  ];

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  // Update current language when i18n language changes
  useEffect(() => {
    const handleLanguageChanged = () => {
      setCurrentLanguage(i18n.language);
    };

    i18n.on('languageChanged', handleLanguageChanged);

    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, [i18n]);

  return (
    <LanguageContext.Provider 
      value={{ 
        currentLanguage, 
        changeLanguage, 
        languageOptions 
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
