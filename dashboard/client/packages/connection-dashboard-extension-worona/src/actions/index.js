import * as types from '../types';

export const connectionStarted = () => ({ type: types.CONNECTION_STARTED });
export const connectionRequested = () => ({ type: types.CONNECTION_REQUESTED });
export const connectionSucceed = () => ({ type: types.CONNECTION_SUCCEED });
export const connectionFailed = error => ({ type: types.CONNECTION_FAILED, error });
export const disconnected = error => ({ type: types.DISCONNECTED, error });
