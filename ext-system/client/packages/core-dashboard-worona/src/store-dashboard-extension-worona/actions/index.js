import * as t from '../actiontypes';

export const reloadReducersRequested = name => ({ type: t.RELOAD_REDUCERS_REQUESTED, name });
export const reloadReducersSucceed = name => ({ type: t.RELOAD_REDUCERS_SUCCEED, name });
export const reloadReducersFailed = error => ({ type: t.RELOAD_REDUCERS_FAILED, error });
