import { combineReducers } from 'redux';
import * as t from '../types';
import * as rC from '../reducerCreators';

export const isDownloading = rC.isLoadingCreator({
  requested: t.THEME_DOWNLOAD_REQUESTED,
  succeed: t.THEME_DOWNLOAD_SUCCEED,
  failed: t.THEME_DOWNLOAD_FAILED,
});

export const isLoading = rC.isLoadingCreator({
  requested: t.THEME_LOAD_REQUESTED,
  succeed: t.THEME_LOAD_SUCCEED,
  failed: t.THEME_LOAD_FAILED,
});

export const isReady = rC.isReadyCreator({
  requested: t.THEME_LOAD_REQUESTED,
  succeed: t.THEME_LOAD_SUCCEED,
});

export const requested = (state = false, action) => {
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

export const loaded = (state = [], action) => {
  if (action.type === t.THEME_LOAD_SUCCEED) {
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
  isLoading,
  isReady,
  current,
  downloaded,
  loaded,
  requested,
});
