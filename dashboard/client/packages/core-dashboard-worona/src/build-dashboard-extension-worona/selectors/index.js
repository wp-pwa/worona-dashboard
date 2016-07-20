import _ from 'lodash';
import * as indexReducers from '../reducers';
import * as themeReducers from '../reducers/theme';

const selectors = {};
_(indexReducers).omit('default').keys()
.forEach(reducer => { selectors[reducer] = state => state.build[reducer]; });

selectors.theme = {};
_(themeReducers).omit('default').keys()
.forEach(reducer => { selectors.theme[reducer] = state => state.build.theme[reducer]; });

module.exports = selectors;
