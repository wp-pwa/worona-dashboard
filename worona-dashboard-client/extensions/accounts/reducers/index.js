import { combineReducers } from 'redux';

export const isLoggedIn = (state = false) => state;
export const isLoggingIn = (state = false) => state;
export const isLoggingOut = (state = false) => state;
export const counter = (state = 0, action) => {
  if (action.type === 'INC') {
    return state + 1;
  } else if (action.type === 'DEC') {
    return state - 1;
  }
  return state;
};


export const accounts = combineReducers({
  isLoggedIn,
  isLoggingIn,
  isLoggingOut,
  counter,
});
