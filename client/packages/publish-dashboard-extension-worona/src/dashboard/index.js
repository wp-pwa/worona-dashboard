import * as actions from './actions';
import * as types from './types';
import * as sagas from './sagas';

const locales = lang => require(`./locales/${lang}.json`);

export {
  actions,
  locales,
  sagas,
  types,
};
