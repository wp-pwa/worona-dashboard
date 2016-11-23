/* eslint-disable global-require, import/no-dynamic-require */
import './style.sass';
import * as actions from './actions';
import * as types from './types';
import * as selectors from './selectors';
import * as reducers from './reducers';
import * as components from './components';
import * as elements from './elements';
import * as deps from './deps';

const locales = lang => require(`./locales/${lang}.json`);

export {
  actions,
  types,
  selectors,
  reducers,
  components,
  elements,
  locales,
  deps,
};
