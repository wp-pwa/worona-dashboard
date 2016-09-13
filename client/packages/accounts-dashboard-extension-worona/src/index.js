import * as actions from './actions';
import * as types from './types';
import * as reducers from './reducers';
import * as selectors from './selectors';
import * as sagas from './sagas';
const locales = lang => require(`./locales/${lang}.json`);

export {
  actions,
  types,
  reducers,
  selectors,
  sagas,
  locales,
};
