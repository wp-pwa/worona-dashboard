import { combineReducers } from 'redux';
import * as types from '../types';

export const isLoggedIn = (state = false, action) => {
  switch (action.type) {
    case types.LOGIN_SUCCEED:
      return true;
    case types.LOGOUT_SUCCEED:
      return false;
    default:
      return state;
  }
};

export const userId = (state = null, action) => {
  switch (action.type) {
    case types.LOGIN_SUCCEED:
      return action.userId;
    case types.LOGOUT_SUCCEED:
      return null;
    default:
      return state;
  }
};

export const isLoggingIn = (state = false, action) => {
  switch (action.type) {
    case types.LOGIN_REQUESTED:
      return true;
    case types.LOGIN_FAILED:
    case types.LOGIN_SUCCEED:
      return false;
    default:
      return state;
  }
};


export const loginStatus = (state = false, action) => {
  switch (action.type) {
    case types.LOGIN_STATUS_CHANGED:
      return action.status;
    case types.LOGIN_SUCCEED:
    case types.LOGIN_FAILED:
      return false;
    default:
      return state;
  }
};

export const loginError = (state = false, action) => {
  switch (action.type) {
    case types.LOGIN_FAILED:
      return action.error;
    case types.LOGIN_REQUESTED:
    case types.LOGIN_SUCCEED:
      return false;
    default:
      return state;
  }
};

export const isLoggingOut = (state = false, action) => {
  switch (action.type) {
    case types.LOGOUT_REQUESTED:
      return true;
    case types.LOGOUT_FAILED:
    case types.LOGOUT_SUCCEED:
      return false;
    default:
      return state;
  }
};

export const logoutStatus = (state = false, action) => {
  switch (action.type) {
    case types.LOGOUT_STATUS_CHANGED:
      return action.status;
    case types.LOGOUT_SUCCEED:
    case types.LOGOUT_FAILED:
      return false;
    default:
      return state;
  }
};

export const logoutError = (state = false, action) => {
  switch (action.type) {
    case types.LOGOUT_FAILED:
      return action.error;
    case types.LOGOUT_REQUESTED:
    case types.LOGOUT_SUCCEED:
      return false;
    default:
      return state;
  }
};

export const isCreatingAccount = (state = false, action) => {
  switch (action.type) {
    case types.CREATE_ACCOUNT_REQUESTED:
      return true;
    case types.CREATE_ACCOUNT_FAILED:
    case types.CREATE_ACCOUNT_SUCCEED:
      return false;
    default:
      return state;
  }
};

export const createAccountStatus = (state = false, action) => {
  switch (action.type) {
    case types.CREATE_ACCOUNT_STATUS_CHANGED:
      return action.status;
    case types.CREATE_ACCOUNT_SUCCEED:
    case types.CREATE_ACCOUNT_FAILED:
      return false;
    default:
      return state;
  }
};

export const createAccountError = (state = false, action) => {
  switch (action.type) {
    case types.CREATE_ACCOUNT_FAILED:
      return action.error;
    case types.CREATE_ACCOUNT_REQUESTED:
    case types.CREATE_ACCOUNT_SUCCEED:
      return false;
    default:
      return state;
  }
};

export const isFirstLogin = (state = false, action) => {
  switch (action.type) {
    case types.CREATE_ACCOUNT_SUCCEED:
      return true;
    case types.LOGOUT_SUCCEED:
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
