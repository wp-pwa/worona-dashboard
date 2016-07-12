import './style.sass';

import * as actions from './actions';
import * as types from './types';
import * as selectors from './selectors';
import * as reducers from './reducers';
import * as components from './components';
const locales = name => require(`./locales/${name}.json`);

export {
  actions,
  types,
  selectors,
  reducers,
  components,
  locales,
};
