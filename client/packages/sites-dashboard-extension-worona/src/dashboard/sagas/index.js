import { fork } from 'redux-saga/effects';
import { createSiteWatcher } from './createSite';
import { deleteSiteWatcher } from './deleteSite';
import { checkSiteWatcher } from './checkSite';
import * as deps from '../deps';

export default function* siteSagas() {
  yield [
    fork(createSiteWatcher),
    fork(deleteSiteWatcher),
    fork(checkSiteWatcher),
    fork(deps.sagaCreators.subscriptionWatcherCreator('sites')),
  ];
}
