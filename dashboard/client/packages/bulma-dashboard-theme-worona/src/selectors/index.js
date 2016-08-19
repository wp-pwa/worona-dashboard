import { createSelector } from 'reselect';
import mapValues from 'lodash/mapValues';
import omit from 'lodash/omit';
import * as indexReducers from '../reducers';
import * as formsReducers from '../reducers/forms';
import * as formsRegisterReducers from '../reducers/forms/register';
import * as headerReducers from '../reducers/header';
import { initialHeaderItems, loggedInItems } from './initialState';

module.exports = mapValues(
  omit(indexReducers, 'default'),
  (value, key) => state => state.bulma[key]
);

module.exports.forms = mapValues(
  omit(formsReducers, 'default'),
  (value, key) => state => state.bulma.forms[key]
);

module.exports.forms.register = mapValues(
  omit(formsRegisterReducers, 'default'),
  (value, key) => state => state.bulma.forms.register[key]
);

module.exports.header = mapValues(
  omit(headerReducers, 'default'),
  (value, key) => state => state.bulma.header[key]
);

module.exports.header.items = createSelector(
  state => state.accounts && state.accounts.isLoggedIn,
  isLoggedIn => (isLoggedIn ? [...initialHeaderItems, ...loggedInItems] : initialHeaderItems)
);
