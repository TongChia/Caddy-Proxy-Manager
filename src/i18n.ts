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
        translation: {
          Dashboard: '仪表盘',
          Hosts: '主机',
          Users: '用户',
          Settings: '设置',
          'Access Lists': '授权',
          'Audit Log': '访问日志',
          'SSL Certificates': 'SSL 证书',
        },
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
