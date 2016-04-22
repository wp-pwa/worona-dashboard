export const LOGIN_REQUEST = 'accounts/LOGIN_REQUEST';
export const loginRequest = (email, password) => ({
  type: 'LOGIN_REQUEST',
  email,
  password,
});

export const LOGIN_FAILURE = 'accounts/LOGIN_FAILURE';
export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  error,
});

export const LOGIN_SUCCESS = 'accounts/LOGIN_SUCCESS';
export const loginSuccess = () => ({
  type: LOGIN_SUCCESS,
});

export const LOGOUT_REQUEST = 'accounts/LOGOUT_REQUEST';
export const logoutRequest = () => ({
  type: LOGOUT_REQUEST,
});

export const LOGOUT_FAILURE = 'accounts/LOGOUT_FAILURE';
export const logoutFailure = (error) => ({
  type: LOGOUT_FAILURE,
  error,
});

export const LOGOUT_SUCCESS = 'accounts/LOGOUT_SUCCESS';
export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
});

export const CREATE_ACCOUNT_REQUEST = 'accounts/CREATE_ACCOUNT_REQUEST';
export const createAccountRequest = (name, email, password) => ({
  type: CREATE_ACCOUNT_REQUEST,
  name,
  email,
  password,
});

export const CREATE_ACCOUNT_FAILURE = 'accounts/CREATE_ACCOUNT_FAILURE';
export const createAccountFailure = (error) => ({
  type: CREATE_ACCOUNT_FAILURE,
  error,
});

export const CREATE_ACCOUNT_SUCCESS = 'accounts/CREATE_ACCOUNT_SUCCESS';
export const createAccountSuccess = (userId) => ({
  type: CREATE_ACCOUNT_SUCCESS,
  userId,
});
