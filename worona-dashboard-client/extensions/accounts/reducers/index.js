import { combineReducers } from 'redux';
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from '../actions';
import { LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE } from '../actions';
import { CREATE_ACCOUNT_REQUEST, CREATE_ACCOUNT_SUCCESS, CREATE_ACCOUNT_FAILURE } from '../actions';

export const isLoggedIn = (state = false, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return true;
    case LOGOUT_SUCCESS:
      return false;
    default:
      return state;
  }
};

export const isLoggingIn = (state = false, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return true;
    case LOGIN_FAILURE:
    case LOGIN_SUCCESS:
      return false;
    default:
      return state;
  }
};

export const isLoggingOut = (state = false, action) => {
  switch (action.type) {
    case LOGOUT_REQUEST:
      return true;
    case LOGOUT_FAILURE:
    case LOGOUT_SUCCESS:
      return false;
    default:
      return state;
  }
};

export const isCreatingAccount = (state = false, action) => {
  switch (action.type) {
    case CREATE_ACCOUNT_REQUEST:
      return true;
    case CREATE_ACCOUNT_FAILURE:
    case CREATE_ACCOUNT_SUCCESS:
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
