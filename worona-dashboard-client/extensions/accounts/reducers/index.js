import { combineReducers } from 'redux';
import {
  LOGIN_REQUESTED,
  LOGIN_SUCCEED,
  LOGIN_FAILED,
  LOGOUT_REQUESTED,
  LOGOUT_SUCCEED,
  LOGOUT_FAILED,
  CREATE_ACCOUNT_REQUESTED,
  CREATE_ACCOUNT_SUCCEED,
  CREATE_ACCOUNT_FAILED,
} from '../actions';

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

export default combineReducers({
  isLoggedIn,
  isLoggingIn,
  isLoggingOut,
  isCreatingAccount,
});
