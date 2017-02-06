import stringifyError from 'stringify-error-message';
import * as types from '../types';

export const loginRequested = (email, password) => ({
  type: types.LOGIN_REQUESTED,
  email,
  password,
});
export const loginStatusChanged = status => ({ type: types.LOGIN_STATUS_CHANGED, status });
export const loginFailed = errorObj => ({
  type: types.LOGIN_FAILED,
  error: stringifyError(errorObj),
});
export const loginSucceed = userId => ({ type: types.LOGIN_SUCCEED, userId });

export const logoutRequested = () => ({ type: types.LOGOUT_REQUESTED });
export const logoutStatusChanged = status => ({ type: types.LOGOUT_STATUS_CHANGED, status });
export const logoutFailed = errorObj => ({
  type: types.LOGOUT_FAILED,
  error: stringifyError(errorObj),
});
export const logoutSucceed = () => ({ type: types.LOGOUT_SUCCEED });

export const createAccountRequested = (name, email, password) => ({
  type: types.CREATE_ACCOUNT_REQUESTED,
  name,
  email,
  password,
});
export const createAccountStatusChanged = status => ({
  type: types.CREATE_ACCOUNT_STATUS_CHANGED,
  status,
});
export const createAccountFailed = errorObj => ({
  type: types.CREATE_ACCOUNT_FAILED,
  error: stringifyError(errorObj),
});
export const createAccountSucceed = userId => ({
  type: types.CREATE_ACCOUNT_SUCCEED,
  userId,
});

export const forgotPasswordRequested = ({ email }) => ({
  type: types.FORGOT_PASSWORD_REQUESTED,
  email,
});
export const forgotPasswordFailed = ({ error }) => ({
  type: types.FORGOT_PASSWORD_FAILED,
  error,
});
export const forgotPasswordSucceed = () => ({
  type: types.FORGOT_PASSWORD_SUCCEED,
});

export const recoverPasswordRequested = ({ token, password }) => ({
  type: types.RECOVER_PASSWORD_REQUESTED,
  token,
  password,
});
export const recoverPasswordFailed = ({ error }) => ({
  type: types.RECOVER_PASSWORD_FAILED,
  error,
});
export const recoverPasswordSucceed = () => ({
  type: types.RECOVER_PASSWORD_SUCCEED,
});
