/* eslint-disable no-console */
import { isDev } from 'worona-deps';
import { combineReducers } from 'redux';
import assets from './assets';
import packages from './packages';

const log = (state, action) => {
  if (isDev && !action.type.startsWith('@@redux')) console.log(action); return false;
};

export default () => combineReducers({
  packages,
  assets,
  log,
});
