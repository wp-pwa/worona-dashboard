export const LOGIN_REQUESTED = 'accounts/LOGIN_REQUESTED';
export const loginRequested = (email, password) => ({
  type: LOGIN_REQUESTED,
  email,
  password,
});

export const LOGIN_FAILED = 'accounts/LOGIN_FAILED';
export const loginFailed = (error) => ({
  type: LOGIN_FAILED,
  error,
});

export const LOGIN_SUCCEED = 'accounts/LOGIN_SUCCEED';
export const loginSucceed = () => ({
  type: LOGIN_SUCCEED,
});

export const LOGOUT_REQUESTED = 'accounts/LOGOUT_REQUESTED';
export const logoutRequested = () => ({
  type: LOGOUT_REQUESTED,
});

export const LOGOUT_FAILED = 'accounts/LOGOUT_FAILED';
export const logoutFailed = (error) => ({
  type: LOGOUT_FAILED,
  error,
});

export const LOGOUT_SUCCEED = 'accounts/LOGOUT_SUCCEED';
export const logoutSucceed = () => ({
  type: LOGOUT_SUCCEED,
});

export const CREATE_ACCOUNT_REQUESTED = 'accounts/CREATE_ACCOUNT_REQUESTED';
export const createAccountRequested = (name, email, password) => ({
  type: CREATE_ACCOUNT_REQUESTED,
  name,
  email,
  password,
});

export const CREATE_ACCOUNT_FAILED = 'accounts/CREATE_ACCOUNT_FAILED';
export const createAccountFailed = (error) => ({
  type: CREATE_ACCOUNT_FAILED,
  error,
});

export const CREATE_ACCOUNT_SUCCEED = 'accounts/CREATE_ACCOUNT_SUCCEED';
export const createAccountSucceed = (userId) => ({
  type: CREATE_ACCOUNT_SUCCEED,
  userId,
});
