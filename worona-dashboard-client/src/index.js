const origin = 'https://cdn.worona.io';
const fallback = process.env.NODE_ENV === 'development' ?
  'http://localhost:6000' : null;

const init = () => {
  document.write('worona dashboard loaded');
  console.log('worona dashboard loaded');
};

init();
