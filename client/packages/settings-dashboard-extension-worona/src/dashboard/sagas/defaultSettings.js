/* eslint-disable no-constant-condition */
import { takeEvery } from 'redux-saga';
import { select, take, put } from 'redux-saga/effects';
import * as actions from '../actions';
import * as deps from '../deps';

export function* waitForPackageActivation({ name }) {
  while (true) {
    const action = yield take(deps.types.PACKAGE_ACTIVATION_SUCCEED);
    if (action.pkg.name === name) break;
  }
}

export function* defaultSettings(action) {
  // First check if the new setting has been initialisated or not.
  if (action.collection === 'settings-live' && action.event === 'added' &&
    action.fields.woronaInfo.init === false) {
    // Now check if the correct plugin is already loaded.
    const name = action.fields.woronaInfo.name;
    const namespace = action.fields.woronaInfo.namespace;
    const activatedPackages = yield select(deps.selectors.getActivatedPackages);
    if (activatedPackages[namespace] !== name) {
      // The correct package is not loaded, we need to wait until it is.
      yield waitForPackageActivation({ name });
    }
    yield put(actions.defaultSettingsNeeded({ name, siteId: action.fields.woronaInfo.siteId }));
  }
}

export function* defaultSettingsWatcher() {
  yield takeEvery(deps.types.COLLECTION_MODIFIED, defaultSettings);
}
