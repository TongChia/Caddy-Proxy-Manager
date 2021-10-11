import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import languageDetector from 'i18next-browser-languagedetector';
import { capitalize } from './utils';

type dateStyle = 'full' | 'short' | 'long' | 'medium' | undefined;

export const i18nInit = i18next
  .use(initReactI18next)
  .use(languageDetector)
  .init({
    // lng: 'zh',
    fallbackLng: 'en',
    debug: false,
    resources: {
      en: {
        translation: {
          zerossl: 'ZeroSSL',
          datetime: '{{date, full/short}}',
          uppercase: '{{text, uppercase}}',
          capitalize: '{{text, capitalize}}',
        },
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
          'Add Host': '添加主机',
          'Add SSL Certificates': '添加 SSL 证书',
          'Add User': '添加用户',
          Created: '创建于',
          Name: '名称',
          Email: '邮箱',
          Roles: '角色',
        },
      },
    },
    interpolation: {
      format: (value, format, lng, options) => {
        if (value instanceof Date) {
          const [dateStyle, timeStyle] = (format || 'full/short').split(
            '/',
          ) as dateStyle[];
          return new Intl.DateTimeFormat(lng, { dateStyle, timeStyle }).format(
            value,
          );
        }
        if (format === 'uppercase') return value.toUpperCase();
        if (format === 'capitalize') return capitalize(value);
        return value;
      },
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
    detection: {
      order: ['localStorage', 'cookie', 'navigator'],
      lookupCookie: 'i18next',
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage', 'cookie'],
    },
  });
