import { getLocale } from 'worona-deps';
import _ from 'lodash';
import i18next from 'i18next';
import XHR from 'i18next-xhr-backend';

const loadLocales = (url, options, callback) => {
  const [ns, lng] = _.drop(/(.+)##(.+)/.exec(url));
  if (ns !== 'translation') { // Don't load the default namespace.
    try {
      const locale = getLocale(ns, lng);
      locale(file => callback(file, { status: '200' }));
    } catch (error) {
      callback(null, { status: '404' });
    }
  } else {
    callback(null, { status: '404' });
  }
};

i18next
  .use(XHR)
  .init({
    lng: 'en',
    fallbackLng: 'en',
    ns: 'build',
    debug: false,
    interpolation: {
      escapeValue: false, // Not needed for react.
    },
    backend: {
      loadPath: '{{ns}}##{{lng}}',
      parse: data => data,
      ajax: loadLocales,
    },
  });

export default i18next;
if (typeof window !== 'undefined') window.i18next = i18next;
