import { combineReducers } from 'redux';
import * as t from '../actiontypes';
import * as rC from '../reducerCreators';

export const isLoading = rC.isLoadingCreator(
  t.EXTENSION_LOAD_REQUESTED,
  t.EXTENSION_LOAD_SUCCEED,
  t.EXTENSION_LOAD_FAILED
);

export const isLoaded = rC.isLoadedCreator(
  t.EXTENSION_LOAD_REQUESTED,
  t.EXTENSION_LOAD_SUCCEED
);

export default combineReducers({
  isLoading,
  isLoaded,
});
