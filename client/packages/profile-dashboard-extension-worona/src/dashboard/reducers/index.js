import { combineReducers } from 'redux';
import * as deps from '../deps';

export default () => combineReducers({
  user: deps.reducerCreators.objectCreator('users'),
});
