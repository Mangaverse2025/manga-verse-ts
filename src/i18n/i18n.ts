
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translations - we need to structure the resources properly
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
      en: {
        common: enTranslation.common,
        language: enTranslation.language,
        settings: enTranslation.settings,
        manga: enTranslation.manga
      },
      es: {
        common: esTranslation.common,
        language: esTranslation.language,
        settings: esTranslation.settings,
        manga: esTranslation.manga
      },
      'zh-CN': {
        common: zhCNTranslation.common,
        language: zhCNTranslation.language,
        settings: zhCNTranslation.settings,
        manga: zhCNTranslation.manga
      },
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
