import { combineReducers } from 'redux';
import * as t from '../actiontypes';
import * as rC from '../reducerCreators';

export const isLoading = rC.isLoadingCreator({
  requested: t.THEME_LOAD_REQUESTED,
  succeed: t.THEME_LOAD_SUCCEED,
  failed: t.THEME_LOAD_FAILED,
});

export const isReady = rC.isReadyCreator({
  requested: t.THEME_LOAD_REQUESTED,
  succeed: t.THEME_LOAD_SUCCEED,
});

export default combineReducers({
  isLoading,
  isReady,
});
