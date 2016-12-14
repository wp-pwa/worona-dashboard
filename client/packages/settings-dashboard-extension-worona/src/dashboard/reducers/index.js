import { isDev, getDevelopmentPackages } from 'worona-deps';
import { map } from 'lodash';
import { combineReducers } from 'redux';
import * as deps from '../deps';
import savingSettings from './savingSettings';

const env = isDev ? 'dev' : 'prod';
const mapPkg = pkg => ({ ...pkg, main: pkg.cdn && pkg.cdn.dashboard[env].main.file });

const createSetting = collection => combineReducers({
  collection: deps.reducerCreators.collectionCreator(collection),
  isReady: deps.reducerCreators.isReadyCreator(collection),
});

const createPkg = collection => combineReducers({
  collection: deps.reducerCreators.collectionCreator(collection, mapPkg),
  isReady: deps.reducerCreators.isReadyCreator(collection),
});

const devPkgs = map(getDevelopmentPackages(), pkg => pkg.woronaInfo);
export const devPackages = () => devPkgs;

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
