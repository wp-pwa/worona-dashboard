import { isRemote } from 'worona-deps';

const remote = window.location.host === 'predashboard.worona.org'
  ? 'wss://premeteor.worona.io/websocket'
  : 'wss://meteor.worona.io/websocket';

export const endpoint = isRemote ? remote : 'ws://localhost:3000/websocket';
export const timeout = 10000;
