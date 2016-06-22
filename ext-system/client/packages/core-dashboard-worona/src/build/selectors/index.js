import _ from 'lodash';
import * as indexReducers from '../reducers';
import * as themesReducers from '../reducers/themes';
import * as extensionsReducers from '../reducers/extensions';

const selectors = {};
_(indexReducers).omit('default').keys()
  .forEach(reducer => { selectors[reducer] = state => state.build[reducer]; });

selectors.themes = {};
_(themesReducers).omit('default').keys()
  .forEach(reducer => { selectors.themes[reducer] = state => state.build.extensions[reducer]; });

selectors.extensions = {};
_(extensionsReducers).omit('default').keys()
  .forEach(reducer => { selectors.extensions[reducer] = state => state.build.themes[reducer]; });

module.exports = selectors;
