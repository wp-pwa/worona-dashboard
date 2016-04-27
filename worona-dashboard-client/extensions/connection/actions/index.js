export const CONNECTION_STARTED = 'connection/CONNECTION_STARTED';
export const connectionStarted = () => ({ type: CONNECTION_STARTED });

export const CONNECTION_REQUESTED = 'connection/CONNECTION_REQUESTED';
export const connectionRequested = () => ({ type: CONNECTION_REQUESTED });

export const CONNECTION_SUCCEED = 'connection/CONNECTION_SUCCEED';
export const connectionSucceed = () => ({ type: CONNECTION_SUCCEED });

export const CONNECTION_FAILED = 'connection/CONNECTION_FAILED';
export const connectionFailed = error => ({
  type: CONNECTION_FAILED,
  error,
});

export const DISCONNECTED = 'connection/DISCONNECTED';
export const disconnected = () => ({ type: DISCONNECTED });

export { LOGOUT_SUCCEED, logoutSucceed } from '../dependencies';
