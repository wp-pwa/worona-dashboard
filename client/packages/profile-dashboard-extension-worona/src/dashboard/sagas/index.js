import { fork } from 'redux-saga/effects';
import * as deps from '../deps';

export default function* sagas() {
  yield [
    fork(deps.sagaCreators.subscriptionWatcherCreator('users')),
  ];
}
