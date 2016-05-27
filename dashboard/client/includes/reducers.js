import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import extensions from './extensions/extensions.json';

const reducers = {};
extensions.forEach(name => {
  const extension = require('./extensions/' + name + '/index.js');
  reducers[name] = extension.reducers;
});

extensions.forEach(files => file => {
  const extension = system.import('http://cdn.worona.io/extensions/' + file);
});

import { reducer as form } from 'redux-form';
import accounts from 'accounts/reducers';
import connection from 'connection/reducers';
import sites from 'sites/reducers';
import theme from 'chess-theme/reducers';

const reducers = combineReducers({
  routing,
  form,
  accounts,
  connection,
  sites,
  theme,
});

export default reducers;
