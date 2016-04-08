import { combineReducers } from 'redux';

export const isLoggedIn = (state = false, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCEED':
      return true;
    case 'LOGOUT_SUCCEED':
      return false;
    default:
      return state;
  }
};

export const isLoggingIn = (state = false, action) => {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return true;
    case 'LOGIN_FAILED':
    case 'LOGIN_SUCCEED':
      return false;
    default:
      return state;
  }
};

export const isLoggingOut = (state = false, action) => {
  switch (action.type) {
    case 'LOGOUT_REQUEST':
      return true;
    case 'LOGOUT_FAILED':
    case 'LOGOUT_SUCCEED':
      return false;
    default:
      return state;
  }
};

export const isCreatingAccount = (state = false, action) => {
  switch (action.type) {
    case 'CREATE_ACCOUNT_REQUEST':
      return true;
    case 'CREATE_ACCOUNT_FAILURE':
    case 'CREATE_ACCOUNT_SUCCESS':
      return false;
    default:
      return state;
  }
};

export const accounts = combineReducers({
  isLoggedIn,
  isLoggingIn,
  isLoggingOut,
  isCreatingAccount,
});
