import i18next from 'i18next';

i18next.init({
  lng: 'en',
  resources: {
    en: {
      translation: {
        key: 'hello world',
      },
    },
  },
}, (err, t) => {
  const hw = i18next.t('key');
  console.log(hw);
});

export default i18next;
