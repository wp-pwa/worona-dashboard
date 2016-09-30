import { fork } from 'redux-saga/effects';
import { createSiteWatcher } from './createSite';
import { deleteSiteWatcher } from './deleteSite';
import * as deps from '../dependencies';

export default function* siteSagas() {
  yield [
    fork(createSiteWatcher),
    fork(deleteSiteWatcher),
    fork(deps.sagaCreators.subscriptionWatcherCreator('sites')),
  ];
}
