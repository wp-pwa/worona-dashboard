import { combineReducers } from 'redux';
import * as t from '../types';

export const requested = (state = 'loading', action) => {
  if (action.type === t.THEME_CHANGE_REQUESTED) {
    return action.name;
  }
  return state;
};

export const downloaded = (state = [], action) => {
  if (action.type === t.THEME_DOWNLOAD_SUCCEED) {
    return [...state, action.name];
  }
  return state;
};

export const current = (state = 'loading', action) => {
  if (action.type === t.THEME_CHANGE_SUCCEED) {
    return action.name;
  }
  return state;
};

export default combineReducers({
  current,
  downloaded,
  requested,
});
