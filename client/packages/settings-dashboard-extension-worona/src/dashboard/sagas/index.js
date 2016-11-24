import { isDev } from 'worona-deps';
import { fork } from 'redux-saga/effects';
import * as deps from '../deps';

const env = isDev ? 'dev' : 'prod';

export default function* settingsagas() {
  yield [
    fork(deps.sagaCreators.collectionWatcherCreator('settings-live')),
    fork(deps.sagaCreators.subscriptionWatcherCreator('settings-live')),
    fork(deps.sagaCreators.collectionWatcherCreator('packages')),
    fork(deps.sagaCreators.subscriptionWatcherCreator('packages', env)),
  ];
}
