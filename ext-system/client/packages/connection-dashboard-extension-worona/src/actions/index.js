import * as t from '../actiontypes';

export const connectionStarted = () => ({ type: t.CONNECTION_STARTED });
export const connectionRequested = () => ({ type: t.CONNECTION_REQUESTED });
export const connectionSucceed = () => ({ type: t.CONNECTION_SUCCEED });
export const connectionFailed = error => ({ type: t.CONNECTION_FAILED, error });
export const disconnected = error => ({ type: t.DISCONNECTED, error });
