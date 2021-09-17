import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import languageDetector from 'i18next-browser-languagedetector';

export const i18nInit = i18next
  .use(initReactI18next)
  .use(languageDetector)
  .init({
    // lng: 'zh',
    fallbackLng: 'en',
    debug: false,
    resources: {
      en: {
        translation: {},
      },
      'zh-CN': {
        translation: {},
      },
    },
    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
    detection: {
      order: ['localStorage', 'cookie', 'navigator'],
      lookupCookie: 'i18next',
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage', 'cookie'],
    },
  });
