import * as types from '../types';
import stringifyError from 'stringify-error-message';

export const connectionStarted = () => ({ type: types.CONNECTION_STARTED });
export const connectionRequested = () => ({ type: types.CONNECTION_REQUESTED });
export const connectionSucceed = () => ({ type: types.CONNECTION_SUCCEED });
export const connectionFailed = errorObj =>
({ type: types.CONNECTION_FAILED, error: stringifyError(errorObj) });
export const disconnected = error => ({ type: types.DISCONNECTED, error });
