import { combineReducers } from 'redux';
import * as reducerCreators from '../reducerCreators';
import * as types from '../types';
import theme from './theme';
import extensions from './extensions';

export const isLoading = reducerCreators.isLoadingCreator({
  requested: types.PACKAGES_LOAD_REQUESTED,
  succeed: types.PACKAGES_LOAD_SUCCEED,
  failed: types.PACKAGES_LOAD_FAILED,
});

export const isReady = reducerCreators.isReadyCreator({
  requested: types.PACKAGES_LOAD_REQUESTED,
  succeed: types.PACKAGES_LOAD_SUCCEED,
});

export default combineReducers({
  isLoading,
  isReady,
  theme,
  extensions,
});
