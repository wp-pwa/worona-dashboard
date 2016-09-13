export const url = 'wss://meteor.worona.io/websocket';
export const timeout = 10000;

module.exports.url = process.env.NODE_ENV === 'production' ?
  'wss://meteor.worona.io/websocket' :
  'ws://localhost:3000/websocket';
