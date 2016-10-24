import { combineReducers } from 'redux';

export const testReducer = (state = false) => state;

export default () => combineReducers({
  testReducer,
});
