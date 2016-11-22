import * as actions from './actions';
import * as types from './types';
import * as reducers from './reducers';
import * as selectors from './selectors';
import * as sagas from './sagas';
import * as deps from './deps';
import * as libs from './libs';

const locales = lang => require(`./locales/${lang}.json`);

export {
  actions,
  deps,
  locales,
  reducers,
  sagas,
  selectors,
  types,
  libs,
};
