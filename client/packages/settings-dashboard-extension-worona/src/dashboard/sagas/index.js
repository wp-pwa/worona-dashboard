/* eslint-disable no-constant-condition */
import { isDev } from 'worona-deps';
import { takeEvery } from 'redux-saga';
import { fork, call, select, put } from 'redux-saga/effects';
import * as deps from '../deps';
import * as selectors from '../selectors';
import * as actions from '../actions';
import addSettings from './addSettings';
import saveSettings from './saveSettings';
import defaultSettings from './defaultSettings';

const env = isDev ? 'dev' : 'prod';

export function* requestPackages() {
  yield [
    call(deps.sagaHelpers.waitForReady, 'settings-live', selectors.getSettingsLiveIsReady),
    call(deps.sagaHelpers.waitForReady, 'packages', selectors.getPackageIsReady),
  ];
  const pkgs = yield select(selectors.getPackageCollection);
  yield pkgs.map(pkg => put(deps.actions.packageActivationRequested({ pkg })));
}

export function* addDefaultSettings({ siteId }) {
  const devPkgs = yield select(selectors.getDevPackageCollection);
  yield devPkgs.map(pkg => put(actions.addSettingsRequested({ ...pkg, siteId })));
}

export default function* settingsagas() {
  yield [
    fork(defaultSettings),
    fork(deps.sagaCreators.collectionWatcherCreator('settings-live')),
    fork(deps.sagaCreators.subscriptionWatcherCreator('settings-live')),
    fork(deps.sagaCreators.collectionWatcherCreator('packages')),
    fork(deps.sagaCreators.subscriptionWatcherCreator('packages', env)),
    fork(requestPackages),
    fork(saveSettings),
    fork(addSettings),
    takeEvery(deps.types.CREATE_SITE_SUCCEED, addDefaultSettings),
  ];
}
