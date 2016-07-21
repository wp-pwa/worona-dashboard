/* eslint-disable no-console */
import express from 'express';
import config from './config.json';

function getApp() {
  return require('./app').default;
}

if (module.hot) {
  module.hot.accept('./app', () => {
    console.log('🔁  HMR Reloading `./app`...');
  });
  console.info('✅  Server-side HMR Enabled!');
} else {
  console.info('❌  Server-side HMR Not Supported.');
}

export default express()
  .use((req, res) => getApp().handle(req, res))
  .listen(config.port, error => {
    if (error) {
      console.error(error);
      return;
    }
    console.log(`Listening at http://localhost:${config.port}`);
  })
;
