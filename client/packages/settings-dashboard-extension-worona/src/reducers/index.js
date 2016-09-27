import { combineReducers } from 'redux';
import * as deps from '../dependencies';
import * as types from '../types';

export const categories = (state = [], action) => {
  if (action.type === types.GOTTEN_CATEGORIES_INDEX) {
    return [...action.categoryIndex];
  }
  return state;
};

export default () => combineReducers({
  categories,
  collection: deps.reducerCreators.collectionCreator('settings'),
  isReady: deps.reducerCreators.isReadyCreator('settings'),
});
