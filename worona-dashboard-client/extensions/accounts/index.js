import { combineReducers } from 'redux';

export const isLoggedIn = (state = false) => state;
export const isLoggingIn = (state = false) => state;

export const reducers = combineReducers({
  isLoggedIn,
  isLoggingIn,
});
