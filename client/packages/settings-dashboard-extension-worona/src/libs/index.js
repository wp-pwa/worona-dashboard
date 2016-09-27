import * as deps from '../dependencies';

export const getCatIndex = (api = deps.libs.call) =>
  api('getCatIndex');
