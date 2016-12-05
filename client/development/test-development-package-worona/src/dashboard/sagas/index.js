import { takeEvery } from 'redux-saga';
import { fork, put } from 'redux-saga/effects';
import * as deps from '../deps';

export function* saveDefaults(action) {
  if (action.name === 'test-development-package-worona') {
    yield put(deps.actions.saveSettingsRequested({
      something: 'lalala',
    }, {
      name: 'test-development-package-worona',
      siteId: action.siteId, // This is optional when editing a site.
    }));
  }
}

function* logSaga() {
  console.log('Test development package sagas running!');
}

export default function* testSagas() {
  yield [
    fork(logSaga),
    takeEvery(deps.types.DEFAULT_SETTINGS_NEEDED, saveDefaults),
  ];
}
