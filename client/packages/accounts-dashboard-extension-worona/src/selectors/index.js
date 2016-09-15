import mapValues from 'lodash/mapValues';
import omit from 'lodash/omit';
import * as reducers from '../reducers';

module.exports = mapValues(
  omit(reducers, 'default'),
  (value, key) => state => state.accounts[key]
);

export const redirectAfterLogin = state => state.accounts.redirectAfterLogin;
