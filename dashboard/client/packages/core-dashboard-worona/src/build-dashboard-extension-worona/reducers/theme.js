import { combineReducers } from 'redux';
import * as t from '../types';

const defaultTheme = {
  namespace: 'loading',
};

export const requested = (state = defaultTheme, { type, name, namespace }) => {
  if (type === t.THEME_CHANGE_REQUESTED) {
    return { name, namespace };
  }
  return state;
};

export const isLoading = (state = defaultTheme, { type, name, namespace }) => {
  if (type === t.THEME_CHANGE_STARTED) {
    return { name, namespace };
  }
  return state;
};

export const current = (state = defaultTheme, { type, name, namespace }) => {
  if (type === t.THEME_CHANGE_SUCCEED) {
    return { name, namespace };
  }
  return state;
};

export default combineReducers({
  current,
  isLoading,
  requested,
});
