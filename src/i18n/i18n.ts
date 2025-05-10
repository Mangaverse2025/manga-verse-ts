
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translations
import enTranslation from './locales/en.json';
import esTranslation from './locales/es.json';
import zhCNTranslation from './locales/zh-CN.json';

// Initialize i18next
i18n
  // Detect user language
  .use(LanguageDetector)
  // Pass i18n down to react-i18next
  .use(initReactI18next)
  // Configuration
  .init({
    resources: {
      en: enTranslation,
      es: esTranslation,
      'zh-CN': zhCNTranslation,
    },
    fallbackLng: 'en',
    debug: false, // Set to true during development

    // Common namespace used around the app
    defaultNS: 'common',

    interpolation: {
      escapeValue: false, // Not needed for React as it escapes by default
    },

    // Detection options
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'mangaverse-language',
      caches: ['localStorage'],
    }
  });

export default i18n;
