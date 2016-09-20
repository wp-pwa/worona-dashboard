import * as types from '../types';
// getCatIndex actions:
export const getCatIndexSucceed = (categoryIndex) =>
  ({ type: types.GOTTEN_CATEGORIES_INDEX, categoryIndex });
export const getCatIndexFailed = error =>
  ({ type: types.MISSING_CATEGORIES_INDEX, error });
