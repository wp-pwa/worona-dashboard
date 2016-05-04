import { call } from '../dependencies';

export const createSite = ({ name, url, _id, caller = call }) =>
  caller('createSite', { name, url, _id });

if (typeof window !== 'undefined') window.createSite = createSite;
