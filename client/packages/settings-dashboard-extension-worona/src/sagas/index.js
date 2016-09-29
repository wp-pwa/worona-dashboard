import { fork } from 'redux-saga/effects';
import * as deps from '../dependencies';

export default function* settingsagas() {
  yield [
    fork(deps.sagaCreators.subscriptionWatcherCreator('settings')),
  ];
}
