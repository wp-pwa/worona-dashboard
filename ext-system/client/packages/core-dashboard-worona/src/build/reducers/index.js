import { combineReducers } from 'redux';
import * as rC from '../reducerCreators';
import * as t from '../actiontypes';
import themes from './themes';
import extensions from './extensions';

export const isLoading = rC.isLoadingCreator({
  requested: t.PACKAGES_LOAD_REQUESTED,
  succeed: t.PACKAGES_LOAD_SUCCEED,
  failed: t.PACKAGES_LOAD_FAILED,
});

export const isReady = rC.isReadyCreator({
  requested: t.PACKAGES_LOAD_REQUESTED,
  succeed: t.PACKAGES_LOAD_SUCCEED,
});

export default combineReducers({
  isLoading,
  isReady,
  themes,
  extensions,
});
