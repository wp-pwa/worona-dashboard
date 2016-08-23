import { combineReducers } from 'redux';
import * as t from '../types';

export const requested = (state = 'loading', action) => {
  if (action.type === t.THEME_CHANGE_REQUESTED) {
    return action.namespace;
  }
  return state;
};

export const current = (state = 'loading', action) => {
  if (action.type === t.THEME_CHANGE_STARTED) {
    return action.namespace;
  }
  return state;
};

export default combineReducers({
  current,
  requested,
});
