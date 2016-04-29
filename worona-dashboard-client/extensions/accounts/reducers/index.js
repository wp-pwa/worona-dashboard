import { combineReducers } from 'redux';
import { LOGIN_REQUESTED, LOGIN_SUCCEED, LOGIN_STATUS_CHANGED, LOGIN_FAILED, LOGOUT_REQUESTED,
  LOGOUT_SUCCEED, LOGOUT_STATUS_CHANGED, LOGOUT_FAILED, CREATE_ACCOUNT_REQUESTED,
  CREATE_ACCOUNT_STATUS_CHANGED, CREATE_ACCOUNT_SUCCEED, CREATE_ACCOUNT_FAILED } from '../actions';

export const isLoggedIn = (state = false, action) => {
  switch (action.type) {
    case LOGIN_SUCCEED:
      return true;
    case LOGOUT_SUCCEED:
      return false;
    default:
      return state;
  }
};

export const isLoggingIn = (state = false, action) => {
  switch (action.type) {
    case LOGIN_REQUESTED:
      return true;
    case LOGIN_FAILED:
    case LOGIN_SUCCEED:
      return false;
    default:
      return state;
  }
};


export const loginStatus = (state = false, action) => {
  switch (action.type) {
    case LOGIN_STATUS_CHANGED:
      return action.status;
    case LOGIN_SUCCEED:
    case LOGIN_FAILED:
      return false;
    default:
      return state;
  }
};

export const loginError = (state = false, action) => {
  switch (action.type) {
    case LOGIN_FAILED:
      return action.error;
    case LOGIN_REQUESTED:
    case LOGIN_SUCCEED:
      return false;
    default:
      return state;
  }
};

export const isLoggingOut = (state = false, action) => {
  switch (action.type) {
    case LOGOUT_REQUESTED:
      return true;
    case LOGOUT_FAILED:
    case LOGOUT_SUCCEED:
      return false;
    default:
      return state;
  }
};

export const logoutStatus = (state = false, action) => {
  switch (action.type) {
    case LOGOUT_STATUS_CHANGED:
      return action.status;
    case LOGOUT_SUCCEED:
    case LOGOUT_FAILED:
      return false;
    default:
      return state;
  }
};

export const logoutError = (state = false, action) => {
  switch (action.type) {
    case LOGOUT_FAILED:
      return action.error;
    case LOGOUT_REQUESTED:
    case LOGOUT_SUCCEED:
      return false;
    default:
      return state;
  }
};

export const isCreatingAccount = (state = false, action) => {
  switch (action.type) {
    case CREATE_ACCOUNT_REQUESTED:
      return true;
    case CREATE_ACCOUNT_FAILED:
    case CREATE_ACCOUNT_SUCCEED:
      return false;
    default:
      return state;
  }
};

export const createAccountStatus = (state = false, action) => {
  switch (action.type) {
    case CREATE_ACCOUNT_STATUS_CHANGED:
      return action.status;
    case CREATE_ACCOUNT_SUCCEED:
    case CREATE_ACCOUNT_FAILED:
      return false;
    default:
      return state;
  }
};

export const createAccountError = (state = false, action) => {
  switch (action.type) {
    case CREATE_ACCOUNT_FAILED:
      return action.error;
    case CREATE_ACCOUNT_REQUESTED:
    case CREATE_ACCOUNT_SUCCEED:
      return false;
    default:
      return state;
  }
};

export default combineReducers({
  isLoggedIn,
  isLoggingIn,
  loginError,
  loginStatus,
  isLoggingOut,
  isCreatingAccount,
  createAccountError,
  createAccountStatus,
});
