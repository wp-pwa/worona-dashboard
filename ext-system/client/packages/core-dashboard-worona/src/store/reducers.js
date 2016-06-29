import { combineReducers } from 'redux';
import worona from 'worona';
import { routerReducer as routing } from 'react-router-redux';
import build from '../build-dashboard-extension-worona/reducers';

const initialReducers = {
  routing,
  build,
};

export default function createReducers() {
  return combineReducers(Object.assign({}, initialReducers, worona.reducers));
}
