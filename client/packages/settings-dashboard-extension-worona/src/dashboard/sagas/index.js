import { fork } from 'redux-saga/effects';
import * as deps from '../deps';

export default function* settingsagas() {
  yield [
    fork(deps.sagaCreators.collectionWatcherCreator('settings')),
    fork(deps.sagaCreators.subscriptionWatcherCreator('settings')),
  ];
}
