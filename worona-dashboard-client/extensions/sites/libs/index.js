import { call } from '../dependencies';

export const createSite = ({ name, url, _id, caller = call }) =>
  caller('createSite', { name, url, _id });

export { collectionEventChannel, subscribe } from '../dependencies';
