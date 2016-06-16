import { put, fork, call } from 'redux-saga/effects';
import { extensionLoadRequested } from '../actions';
// import defaultExtensions from '../../../extensions/extensions.json';
import worona from '../../worona';

const requirePackage = name => new Promise(resolve => {
  const req = require(`../../../../${name}-worona/src/index.js`);
  req(extension => resolve(extension));
});

export function* loadExtension(name) {
  yield put(extensionLoadRequested(name));
  const packageData = yield call(requirePackage, name);
  worona.actions[name] = packageData.actions;
  worona.actiontypes[name] = packageData.actiontypes;
  worona.selectors[name] = packageData.selectors;
}

export function* loadDefaultExtensions() {
  yield defaultExtensions.map(name => fork(loadExtension, name));
}

export default function* sagas() {
  yield [
    fork(loadDefaultExtensions),
  ];
}
