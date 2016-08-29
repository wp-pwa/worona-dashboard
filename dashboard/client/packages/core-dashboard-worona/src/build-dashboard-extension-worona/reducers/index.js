import { combineReducers } from 'redux';
import theme from './theme';
import packages from './packages';
import assets from './assets';

export default () => combineReducers({
  packages,
  theme,
  // assets,
});
