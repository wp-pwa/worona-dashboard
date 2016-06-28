import { combineReducers } from 'redux';
import * as t from '../actiontypes';
import * as rC from '../reducerCreators';

export const isLoading = rC.isLoadingCreator({
  requested: t.EXTENSIONS_LOAD_REQUESTED,
  succeed: t.EXTENSIONS_LOAD_SUCCEED,
  failed: t.EXTENSIONS_LOAD_FAILED,
});

export const isReady = rC.isReadyCreator({
  requested: t.EXTENSIONS_LOAD_REQUESTED,
  succeed: t.EXTENSIONS_LOAD_SUCCEED,
});

export default combineReducers({
  isLoading,
  isReady,
});
