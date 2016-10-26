import { fork } from 'redux-saga/effects';
import { createSiteWatcher } from './createSite';
import { deleteSiteWatcher } from './deleteSite';
import { checkSiteWatcher } from './checkSite';
import { editSiteWatcher } from './editSite';
import * as deps from '../deps';

export default function* siteSagas() {
  yield [
    fork(createSiteWatcher),
    fork(deleteSiteWatcher),
    fork(checkSiteWatcher),
    fork(editSiteWatcher),
    fork(deps.sagaCreators.subscriptionWatcherCreator('sites')),
  ];
}
