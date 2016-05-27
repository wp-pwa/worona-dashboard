import { combineReducers } from 'redux';
import * as t from '../actiontypes';
import * as rC from '../reducerCreators';

export const isLoading = rC.isLoadingCreator(
  t.THEME_LOAD_REQUESTED,
  t.THEME_LOAD_SUCCEED,
  t.THEME_LOAD_FAILED
);

export const isLoaded = rC.isLoadedCreator(
  t.THEME_LOAD_REQUESTED,
  t.THEME_LOAD_SUCCEED
);

export default combineReducers({
  isLoading,
  isLoaded,
});
