import * as actions from './actions';
import * as types from './types';
import * as reducerCreators from './reducerCreators';
import * as reducers from './reducers';
import * as libs from './libs';
import * as store from './store';
import * as sagas from './sagas';
import * as routes from './routes';
import * as selectors from './selectors';
const locales = lang => require(`./locales/${lang}.json`);

export {
  actions,
  types,
  reducerCreators,
  reducers,
  libs,
  store,
  sagas,
  selectors,
  routes,
  locales,
};
