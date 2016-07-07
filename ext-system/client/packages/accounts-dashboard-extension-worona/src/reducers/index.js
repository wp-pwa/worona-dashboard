import { combineReducers } from 'redux';
import t from '../types';

export const isLoggedIn = (state = false, action) => {
  switch (action.type) {
    case t.LOGIN_SUCCEED:
      return true;
    case t.LOGOUT_SUCCEED:
      return false;
    default:
      return state;
  }
};

export const userId = (state = null, action) => {
  switch (action.type) {
    case t.LOGIN_SUCCEED:
      return action.userId;
    case t.LOGOUT_SUCCEED:
      return null;
    default:
      return state;
  }
};

export const isLoggingIn = (state = false, action) => {
  switch (action.type) {
    case t.LOGIN_REQUESTED:
      return true;
    case t.LOGIN_FAILED:
    case t.LOGIN_SUCCEED:
      return false;
    default:
      return state;
  }
};


export const loginStatus = (state = false, action) => {
  switch (action.type) {
    case t.LOGIN_STATUS_CHANGED:
      return action.status;
    case t.LOGIN_SUCCEED:
    case t.LOGIN_FAILED:
      return false;
    default:
      return state;
  }
};

export const loginError = (state = false, action) => {
  switch (action.type) {
    case t.LOGIN_FAILED:
      return action.error;
    case t.LOGIN_REQUESTED:
    case t.LOGIN_SUCCEED:
      return false;
    default:
      return state;
  }
};

export const isLoggingOut = (state = false, action) => {
  switch (action.type) {
    case t.LOGOUT_REQUESTED:
      return true;
    case t.LOGOUT_FAILED:
    case t.LOGOUT_SUCCEED:
      return false;
    default:
      return state;
  }
};

export const logoutStatus = (state = false, action) => {
  switch (action.type) {
    case t.LOGOUT_STATUS_CHANGED:
      return action.status;
    case t.LOGOUT_SUCCEED:
    case t.LOGOUT_FAILED:
      return false;
    default:
      return state;
  }
};

export const logoutError = (state = false, action) => {
  switch (action.type) {
    case t.LOGOUT_FAILED:
      return action.error;
    case t.LOGOUT_REQUESTED:
    case t.LOGOUT_SUCCEED:
      return false;
    default:
      return state;
  }
};

export const isCreatingAccount = (state = false, action) => {
  switch (action.type) {
    case t.CREATE_ACCOUNT_REQUESTED:
      return true;
    case t.CREATE_ACCOUNT_FAILED:
    case t.CREATE_ACCOUNT_SUCCEED:
      return false;
    default:
      return state;
  }
};

export const createAccountStatus = (state = false, action) => {
  switch (action.type) {
    case t.CREATE_ACCOUNT_STATUS_CHANGED:
      return action.status;
    case t.CREATE_ACCOUNT_SUCCEED:
    case t.CREATE_ACCOUNT_FAILED:
      return false;
    default:
      return state;
  }
};

export const createAccountError = (state = false, action) => {
  switch (action.type) {
    case t.CREATE_ACCOUNT_FAILED:
      return action.error;
    case t.CREATE_ACCOUNT_REQUESTED:
    case t.CREATE_ACCOUNT_SUCCEED:
      return false;
    default:
      return state;
  }
};

export const isFirstLogin = (state = false, action) => {
  switch (action.type) {
    case t.CREATE_ACCOUNT_SUCCEED:
      return true;
    case t.LOGOUT_SUCCEED:
      return false;
    default:
      return state;
  }
};

export default combineReducers({
  isLoggedIn,
  userId,
  isLoggingIn,
  loginError,
  loginStatus,
  isLoggingOut,
  isCreatingAccount,
  createAccountError,
  createAccountStatus,
  isFirstLogin,
});
