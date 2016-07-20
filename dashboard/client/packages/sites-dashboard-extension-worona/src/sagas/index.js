import { fork } from 'redux-saga/effects';
import { createSiteWatcher } from './createSite';
import * as deps from '../dependencies';

export default function* () {
  yield [
    fork(createSiteWatcher),
    fork(deps.sagaCreators.subscriptionWatcherCreator('sites')),
  ];
}
