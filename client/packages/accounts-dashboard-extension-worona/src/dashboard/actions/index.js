import stringifyError from 'stringify-error-message';
import * as t from '../types';

export const loginRequested = (email, password) => ({ type: t.LOGIN_REQUESTED, email, password });
export const loginStatusChanged = status => ({ type: t.LOGIN_STATUS_CHANGED, status });
export const loginFailed = errorObj => ({ type: t.LOGIN_FAILED, error: stringifyError(errorObj) });
export const loginSucceed = userId => ({ type: t.LOGIN_SUCCEED, userId });
export const logoutRequested = () => ({ type: t.LOGOUT_REQUESTED });
export const logoutStatusChanged = status => ({ type: t.LOGOUT_STATUS_CHANGED, status });
export const logoutFailed = errorObj =>
  ({ type: t.LOGOUT_FAILED, error: stringifyError(errorObj) });
export const logoutSucceed = () => ({ type: t.LOGOUT_SUCCEED });
export const createAccountRequested = (name, email, password) =>
  ({ type: t.CREATE_ACCOUNT_REQUESTED, name, email, password });
export const createAccountStatusChanged = status =>
  ({ type: t.CREATE_ACCOUNT_STATUS_CHANGED, status });
export const createAccountFailed = errorObj =>
 ({ type: t.CREATE_ACCOUNT_FAILED, error: stringifyError(errorObj) });
export const createAccountSucceed = userId => ({ type: t.CREATE_ACCOUNT_SUCCEED, userId });
