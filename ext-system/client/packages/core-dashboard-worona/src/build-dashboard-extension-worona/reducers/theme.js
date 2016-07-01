import { combineReducers } from 'redux';
import * as types from '../types';
import * as reducerCreators from '../reducerCreators';

export const isLoading = reducerCreators.isLoadingCreator({
  requested: types.THEME_LOAD_REQUESTED,
  succeed: types.THEME_LOAD_SUCCEED,
  failed: types.THEME_LOAD_FAILED,
});

export const isReady = reducerCreators.isReadyCreator({
  requested: types.THEME_LOAD_REQUESTED,
  succeed: types.THEME_LOAD_SUCCEED,
});

export const name = (state = 'loading', action) => {
  if (action.type === types.THEME_LOAD_SUCCEED) {
    return action.name;
  }
  return state;
};

export default combineReducers({
  isLoading,
  isReady,
  name,
});
