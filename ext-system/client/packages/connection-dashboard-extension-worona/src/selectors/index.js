import _ from 'lodash';
import * as reducers from '../reducers';

_(reducers).omit('default').keys()
  .forEach(reducer => { module.exports[reducer] = state => state.connection[reducer]; });
