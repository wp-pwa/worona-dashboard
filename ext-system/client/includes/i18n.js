import i18next from 'i18next';
import XHR from 'i18next-xhr-backend';

i18next
  // .use(XHR)
  .init({
    lng: 'es',
    fallbackLng: 'en',
    ns: 'connection',
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    // backend: {
    //   loadPath: '/locales/{{ns}}.{{lng}}.json',
    //   allowMultiLoading: false,
    // },
  });

export default i18next;
