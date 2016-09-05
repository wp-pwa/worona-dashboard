import { combineReducers } from 'redux';
import * as types from '../types';

export const css = (state = [], action) => {
  switch (action.type) {
    case types.THEME_CSS_LOAD_REQUESTED:
      return action.pkg.prod.assets.css;
    default:
      return state;
  }
};

export default combineReducers({
  css,
});
