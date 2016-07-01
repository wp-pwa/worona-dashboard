import { combineReducers } from 'redux';
import * as types from '../types';
import * as reducerCreators from '../reducerCreators';

export const isLoading = reducerCreators.isLoadingCreator({
  requested: types.EXTENSIONS_LOAD_REQUESTED,
  succeed: types.EXTENSIONS_LOAD_SUCCEED,
  failed: types.EXTENSIONS_LOAD_FAILED,
});

export const isReady = reducerCreators.isReadyCreator({
  requested: types.EXTENSIONS_LOAD_REQUESTED,
  succeed: types.EXTENSIONS_LOAD_SUCCEED,
});

export default combineReducers({
  isLoading,
  isReady,
});
