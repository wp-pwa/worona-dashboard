import { WebApp } from 'meteor/webapp';

WebApp.rawConnectHandlers.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  return next();
});
