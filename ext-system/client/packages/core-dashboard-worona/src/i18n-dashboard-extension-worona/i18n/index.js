import i18next from 'i18next';
import XHR from 'i18next-xhr-backend';

function loadLocales(url, options, callback, data) {
  try {
    let waitForLocale = require('bundle!./locales/'+url+'.json');
    waitForLocale((locale) => {
      callback(locale, {status: '200'});
    })
  } catch (e) {
    callback(null, {status: '404'});
  }
}

i18next
  .use(XHR)
  .init({
    lng: 'en',
    fallbackLng: 'en',
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: '{{lng}}',
      parse: (data) => data,
      ajax: loadLocales,
    },
  });

export default i18next;
export const i18n = i18next;
