/* eslint-disable no-constant-condition */
import { takeEvery } from 'redux-saga';
import { find } from 'lodash';
import { select, take, put } from 'redux-saga/effects';
import * as actions from '../actions';
import * as deps from '../deps';

export function* defaultSettingsSaga({ fields: { woronaInfo: { name, siteId } }}) {
  // Now check if the correct plugin is already loaded.
  const activatedPackages = yield select(deps.selectors.getActivatedPackages);
  if (!find(activatedPackages, item => item === name)) {
    // The correct package is not loaded, we need to wait until it is.
    yield take(
      ({ type, pkg }) => type === deps.types.PACKAGE_ACTIVATION_SUCCEED && pkg.name === name,
    );
  }
  yield put(actions.defaultSettingsNeeded({ name, siteId }));
}

export default function* defaultSettingsWatcher() {
  yield takeEvery(
    ({ type, collection, event, fields }) =>
      type === deps.types.COLLECTION_MODIFIED &&
      collection === 'settings-live' &&
      event === 'added' &&
      fields.woronaInfo.init === false,
    defaultSettingsSaga,
  );
}
