import { put, fork, call } from 'redux-saga/effects';
import { extensionLoadRequested } from '../actions';
import defaultExtensions from '../../../extensions/extensions.json';
import worona from 'worona';

const requireExtension = name => new Promise(resolve => {
  const req = require(`../../../extensions/${name}/extension.js`);
  req(extension => resolve(extension));
});

const requireTheme = name => new Promise(resolve => {
  const req = require(`../../../themes/${name}/theme.js`);
  req(theme => resolve(theme));
});

export function* loadExtension(name) {
  yield put(extensionLoadRequested(name));
  const extension = yield call(requireExtension, name);
  worona.actions[name] = extension.actions;
  worona.actiontypes[name] = extension.actiontypes;
  worona.selectors[name] = extension.selectors;
}

export function* loadDefaultExtensions() {
  yield defaultExtensions.map(name => fork(loadExtension, name));
}

export default function* sagas() {
  yield [
    fork(loadDefaultExtensions),
  ];
}
