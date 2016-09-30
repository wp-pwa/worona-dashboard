import { combineReducers } from 'redux';
import * as deps from '../dependencies';

export default () => combineReducers({
  collection: deps.reducerCreators.collectionCreator('settings'),
  isReady: deps.reducerCreators.isReadyCreator('settings'),
});
