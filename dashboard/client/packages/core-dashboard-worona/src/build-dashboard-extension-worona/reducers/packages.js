import { combineReducers } from 'redux';
import { flow, keyBy, mapValues } from 'lodash/fp';
import * as t from '../types';

const mapPkgs = flow([
  keyBy(pkg => pkg.namespace),
  mapValues(pkg => pkg.name),
]);

export const requested = (state = {}, action) => {
  switch (action.type) {
    case t.PACKAGES_ADDITION_REQUESTED:
      return Object.assign({}, state, mapPkgs(action.pkgs));
    default:
      return state;
  }
};

export const downloaded = (state = {}, action) => {
  if (action.type === t.PACKAGE_DOWNLOAD_SUCCEED) {
    return Object.assign({}, state, { [action.pkg.namespace]: action.pkg.name });
  }
  return state;
};

export const failed = (state = {}, action) => {
  if (action.type === t.PACKAGE_DOWNLOAD_FAILED) {
    return Object.assign({}, state, { [action.pkg.namespace]: action.pkg.name });
  }
  return state;
};

export const loaded = (state = {}, action) => {
  if (action.type === t.PACKAGES_LOAD_SUCCEED) {
    return Object.assign({}, state, mapPkgs(action.pkgs));
  }
  return state;
};

export default combineReducers({
  requested,
  downloaded,
  failed,
  loaded,
});
