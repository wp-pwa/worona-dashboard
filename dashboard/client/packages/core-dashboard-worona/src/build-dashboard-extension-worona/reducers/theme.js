import { combineReducers } from 'redux';
import * as types from '../types';

export const assets = (state = [], action) => {
  switch (action.type) {
    case types.THEME_ASSETS_LOAD_REQUESTED:
      return action.pkg.prod.assets;
    default:
      return state;
  }
};

export default combineReducers({
  assets,
});
