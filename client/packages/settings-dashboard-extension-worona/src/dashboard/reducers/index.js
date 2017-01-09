import { isDev, getDevelopmentPackages } from 'worona-deps';
import { map } from 'lodash';
import { combineReducers } from 'redux';
import * as deps from '../deps';
import savingSettings from './savingSettings';

const env = isDev ? 'dev' : 'prod';
const mapPkg = pkg => ({ ...pkg,
  main: pkg.dashboard[env] && pkg.dashboard[env].main.file,
  assets: pkg.dashboard[env] && pkg.dashboard[env].assets,
  namespace: pkg.dashboard.namespace,
});

const createSetting = ({ collection, subscription }) => combineReducers({
  collection: deps.reducerCreators.collectionCreator(collection),
  isReady: deps.reducerCreators.isReadyCreator(subscription),
});

const createPkg = ({ collection, subscription }) => combineReducers({
  collection: deps.reducerCreators.collectionCreator(collection, mapPkg),
  isReady: deps.reducerCreators.isReadyCreator(subscription),
});

const devPkgs = map(getDevelopmentPackages(), pkg => pkg.woronaInfo);
export const devPackages = () => devPkgs.map(pkg => mapPkg(pkg));

export const collections = () => combineReducers({
  live: createSetting({ collection: 'settings-live', subscription: 'dashboard-settings-live' }),
  preview: createSetting({ collection: 'settings-preview', subscription: 'dashboard-settings-live' }),
  packages: createPkg({ collection: 'packages', subscription: 'packages' }),
  devPackages: combineReducers({ collection: devPackages }),
});

export default () => combineReducers({
  collections: collections(),
  savingSettings,
});
