import { combineReducers } from 'redux';
import assets from './assets';
import packages from './packages';

export default () => combineReducers({
  packages,
  assets,
});
