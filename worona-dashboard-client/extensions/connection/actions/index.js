import { CONNECTION_STARTED, CONNECTION_REQUESTED, CONNECTION_SUCCEED, CONNECTION_FAILED,
  DISCONNECTED } from '../actiontypes';

export const connectionStarted = () => ({ type: CONNECTION_STARTED });
export const connectionRequested = () => ({ type: CONNECTION_REQUESTED });
export const connectionSucceed = () => ({ type: CONNECTION_SUCCEED });
export const connectionFailed = error => ({ type: CONNECTION_FAILED, error });
export const disconnected = error => ({ type: DISCONNECTED, error });
