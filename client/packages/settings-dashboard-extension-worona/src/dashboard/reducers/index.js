import { combineReducers } from 'redux';
import * as deps from '../deps';

const create = collection => combineReducers({
  collection: deps.reducerCreators.collectionCreator(collection),
  isReady: deps.reducerCreators.isReadyCreator(collection),
});

export const collections = () => combineReducers({
  live: create('settings-live'),
  preview: create('settings-preview'),
  packages: create('packages'),
});

export default () => combineReducers({
  collections: collections(),
});
