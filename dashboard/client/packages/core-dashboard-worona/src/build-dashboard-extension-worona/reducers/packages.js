import { combineReducers } from 'redux';
import update from 'react/lib/update';
import * as types from '../types';

const defaultList = {
  'build-dashboard-extension-worona': {
    name: 'build-dashboard-extension-worona',
    namespace: 'build',
  },
  'loading-dashboard-theme-worona': {
    name: 'loading-dashboard-theme-worona',
    namespace: 'loading',
  },
  'routing-dashboard-extension-worona': {
    name: 'routing-dashboard-extension-worona',
    namespace: 'routing',
  },
};

const defaultDownloaded = [
  'build-dashboard-extension-worona',
  'loading-dashboard-theme-worona',
  'routing-dashboard-extension-worona',
];

export const list = (state = defaultList, action) => {
  switch (action.type) {
    case types.CORE_PACKAGES_SUCCEED:
      return update(state, { $merge: action.pkgs });
    default:
      return state;
  }
};

export const downloaded = (state = defaultDownloaded, action) => {
  switch (action.type) {
    case types.PACKAGE_DOWNLOAD_SUCCEED:
      return [...state, action.pkg.name];
    default:
      return state;
  }
};

export default combineReducers({
  list,
  downloaded,
});
