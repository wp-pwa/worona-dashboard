import { combineReducers } from 'redux';
import theme from './theme';
import packages from './packages';

export default () => combineReducers({
  packages,
  theme,
});
