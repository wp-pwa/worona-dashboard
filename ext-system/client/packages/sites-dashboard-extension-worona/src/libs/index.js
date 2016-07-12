import * as deps from '../dependencies';

export const createSite = ({ name, url, _id, caller = deps.libs.call }) =>
  caller('createSite', { name, url, _id });
