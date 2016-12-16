import { isDev, getDevelopmentPackages } from 'worona-deps';
import { map } from 'lodash';
import { combineReducers } from 'redux';
import * as deps from '../deps';
import savingSettings from './savingSettings';

const env = isDev ? 'dev' : 'prod';
const mapPkg = pkg => ({ ...pkg,
  main: pkg.cdn && pkg.cdn.dashboard[env].main.file,
  assets: pkg.cdn && pkg.cdn.dashboard[env].assets,
  namespace: typeof pkg.namespace === 'object' ? pkg.namespace.dashboard : pkg.namespace,
});

const createSetting = collection => combineReducers({
  collection: deps.reducerCreators.collectionCreator(collection),
  isReady: deps.reducerCreators.isReadyCreator(collection),
});

const createPkg = collection => combineReducers({
  collection: deps.reducerCreators.collectionCreator(collection, mapPkg),
  isReady: deps.reducerCreators.isReadyCreator(collection),
});

const devPkgs = map(getDevelopmentPackages(), pkg => pkg.woronaInfo);
export const devPackages = () => {
  return devPkgs.map(pkg => mapPkg(pkg));
};

export const collections = () => combineReducers({
  live: createSetting('settings-live'),
  preview: createSetting('settings-preview'),
  packages: createPkg('packages'),
  devPackages: combineReducers({ collection: devPackages }),
});

export default () => combineReducers({
  collections: collections(),
  savingSettings,
});
