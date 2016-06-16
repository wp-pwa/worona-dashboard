import { LOGIN_REQUESTED, LOGIN_STATUS_CHANGED, LOGIN_FAILED, LOGIN_SUCCEED, LOGOUT_REQUESTED,
   LOGOUT_STATUS_CHANGED, LOGOUT_SUCCEED, LOGOUT_FAILED, CREATE_ACCOUNT_REQUESTED,
   CREATE_ACCOUNT_STATUS_CHANGED, CREATE_ACCOUNT_FAILED, CREATE_ACCOUNT_SUCCEED }
  from '../actiontypes';

export const loginRequested = (email, password) => ({ type: LOGIN_REQUESTED, email, password });
export const loginStatusChanged = status => ({ type: LOGIN_STATUS_CHANGED, status });
export const loginFailed = error => ({ type: LOGIN_FAILED, error });
export const loginSucceed = userId => ({ type: LOGIN_SUCCEED, userId });
export const logoutRequested = () => ({ type: LOGOUT_REQUESTED });
export const logoutStatusChanged = status => ({ type: LOGOUT_STATUS_CHANGED, status });
export const logoutFailed = error => ({ type: LOGOUT_FAILED, error });
export const logoutSucceed = () => ({ type: LOGOUT_SUCCEED });
export const createAccountRequested = (name, email, password) => ({ type: CREATE_ACCOUNT_REQUESTED,
  name, email, password });
export const createAccountStatusChanged = status => ({ type: CREATE_ACCOUNT_STATUS_CHANGED,
  status });
export const createAccountFailed = error => ({ type: CREATE_ACCOUNT_FAILED, error });
export const createAccountSucceed = userId => ({ type: CREATE_ACCOUNT_SUCCEED, userId });
