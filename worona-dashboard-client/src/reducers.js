// DYNAMIC VERSION
// import { combineReducers } from 'redux';
// import { extensions } from './extensions';
//
// const extensionReducers = {};
//
// extensions.forEach(name => {
//   const extension = require('../extensions/' + name + '/reducers/index.js');
//   extensionReducers[name] = extension[name];
// });
//
// export const reducers = combineReducers(extensionReducers);

import { combineReducers } from 'redux';
import { accounts } from 'accounts/reducers';

export const reducers = combineReducers({
  accounts,
});
