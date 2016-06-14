import _ from 'lodash';
import * as reducers from '../reducers';

const selectors = {};
_(reducers).omit('default').keys()
  .forEach(reducer => { selectors[reducer] = state => state.themes[reducer]; });

export default selectors;
