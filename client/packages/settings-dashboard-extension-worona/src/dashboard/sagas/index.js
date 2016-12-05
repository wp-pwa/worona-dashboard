/* eslint-disable no-constant-condition */
import { isDev } from 'worona-deps';
import { fork, call, select, put } from 'redux-saga/effects';
import * as deps from '../deps';
import * as selectors from '../selectors';
import { saveSettingsWatcher } from './saveSettings';
import { defaultSettingsWatcher } from './defaultSettings';

const env = isDev ? 'dev' : 'prod';

function* requestPackages() {
  yield [
    call(deps.sagaHelpers.waitForReady, 'settings-live', selectors.getSettingsLiveIsReady),
    call(deps.sagaHelpers.waitForReady, 'packages', selectors.getPackageIsReady),
  ];
  const pkgs = yield select(selectors.getPackageCollection);
  yield pkgs.map(pkg => put(deps.actions.packageActivationRequested({ pkg })));
}

export default function* settingsagas() {
  yield [
    fork(defaultSettingsWatcher),
    fork(deps.sagaCreators.collectionWatcherCreator('settings-live')),
    fork(deps.sagaCreators.subscriptionWatcherCreator('settings-live')),
    fork(deps.sagaCreators.collectionWatcherCreator('packages')),
    fork(deps.sagaCreators.subscriptionWatcherCreator('packages', env)),
    fork(requestPackages),
    fork(saveSettingsWatcher),
  ];
}
