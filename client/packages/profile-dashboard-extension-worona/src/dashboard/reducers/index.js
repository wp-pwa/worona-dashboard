import { combineReducers } from 'redux';
import * as deps from '../deps';

export default () => combineReducers({
  userInfo: deps.reducerCreators.objectCreator('userData'),
  isReadyUserInfo: deps.reducerCreators.isReadyCreator('userData'),
});
