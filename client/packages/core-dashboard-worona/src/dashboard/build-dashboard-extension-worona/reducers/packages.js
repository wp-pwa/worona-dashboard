import { getDevelopmentPackages } from 'worona-deps';
import { combineReducers } from 'redux';
import { map, filter } from 'lodash';
import update from 'react/lib/update';
import * as types from '../types';

const developmentPackages = getDevelopmentPackages();

const defaultList = {
  'build-dashboard-extension-worona': {
    name: 'build-dashboard-extension-worona',
    namespace: 'build',
  },
  'loading-dashboard-theme-worona': {
    name: 'loading-dashboard-theme-worona',
    namespace: 'theme',
  },
  'routing-dashboard-extension-worona': {
    name: 'routing-dashboard-extension-worona',
    namespace: 'routing',
  },
};

const defaultDownloaded = [
  ...map(developmentPackages, item => item.name),
  'build-dashboard-extension-worona',
  'loading-dashboard-theme-worona',
  'routing-dashboard-extension-worona',
];

const defaultActivated = {
  build: 'build-dashboard-extension-worona',
  routing: 'routing-dashboard-extension-worona',
  theme: 'loading-dashboard-theme-worona',
};

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

export const activated = (state = defaultActivated, { type, pkg }) => {
  switch (type) {
    case types.PACKAGE_ACTIVATION_SUCCEED:
      return update(state, { $merge: { [pkg.namespace]: pkg.name } });
    case types.PACKAGE_DEACTIVATION_SUCCEED:
      return filter(state, item => item.name === pkg.name);
    default:
      return state;
  }
};

export default combineReducers({
  list,
  downloaded,
  activated,
});
