import { isDev, getDevelopmentPackages } from 'worona-deps';
import { map } from 'lodash';
import { combineReducers } from 'redux';
import * as deps from '../deps';

const env = isDev ? 'dev' : 'prod';
const mapPkg = pkg => ({ ...pkg, main: pkg.cdn && pkg.cdn.dashboard[env].main.file });

const create = collection => combineReducers({
  collection: deps.reducerCreators.collectionCreator(collection, mapPkg),
  isReady: deps.reducerCreators.isReadyCreator(collection),
});

const devPkgs = map(getDevelopmentPackages(), pkg => pkg.woronaInfo);
export const devPackages = () => devPkgs;

export const collections = () => combineReducers({
  live: create('settings-live'),
  preview: create('settings-preview'),
  packages: create('packages'),
  devPackages: combineReducers({ collection: devPackages }),
});

export default () => combineReducers({
  collections: collections(),
});
