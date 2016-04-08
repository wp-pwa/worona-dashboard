
export const loginRequest = (email, password) => ({
  type: 'LOGIN_REQUEST',
  email,
  password,
});

export const loginFailure = (error) => ({
  type: 'LOGIN_FAILURE',
  error,
});

export const loginSuccess = () => ({
  type: 'LOGIN_SUCCESS',
});

export const logoutRequest = () => ({
  type: 'LOGOUT_REQUEST',
});

export const logoutFailure = (error) => ({
  type: 'LOGOUT_FAILURE',
  error,
});

export const logoutSuccess = () => ({
  type: 'LOGOUT_SUCCESS',
});

export const createAccountRequest = (name, email, password) => ({
  type: 'CREATE_ACCOUNT_REQUEST',
  name,
  email,
  password,
});

export const createAccountFailure = (error, name, email, password) => ({
  type: 'CREATE_ACCOUNT_FAILURE',
  _error: error,
  name,
  email,
  password,
});

export const createAccountSuccess = () => ({
  type: 'CREATE_ACCOUNT_SUCCESS',
});
