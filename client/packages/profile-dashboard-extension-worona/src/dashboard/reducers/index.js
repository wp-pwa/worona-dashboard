import { combineReducers } from 'redux';
import * as deps from '../deps';

export default () => combineReducers({
  userInfo: deps.reducerCreators.objectCreator('users'),
  isReadyUserInfo: deps.reducerCreators.isReadyCreator('users'),
});
