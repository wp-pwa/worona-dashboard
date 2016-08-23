import mapValues from 'lodash/mapValues';
import omit from 'lodash/omit';
import * as indexReducers from '../reducers';
import * as themeReducers from '../reducers/theme';
import * as packagesReducers from '../reducers/packages';

module.exports = mapValues(
  omit(indexReducers, 'default'),
  (value, key) => state => state.build[key]
);

module.exports.theme = mapValues(
  omit(themeReducers, 'default'),
  (value, key) => state => state.build.theme[key]
);

module.exports.packages = mapValues(
  omit(packagesReducers, 'default'),
  (value, key) => state => state.build.packages[key]
);
