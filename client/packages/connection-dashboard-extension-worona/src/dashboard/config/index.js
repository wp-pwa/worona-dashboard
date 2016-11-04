import { isRemote } from 'worona-deps';

export const url = isRemote ? 'wss://meteor.worona.io/websocket' : 'ws://localhost:3000/websocket';
export const timeout = 10000;
