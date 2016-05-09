import { fork } from 'redux-saga/effects';
import { createSiteWatcher } from './createSite';
import { sitesCollectionWatcher } from './sitesCollection';

export default function* () {
  yield [
    fork(createSiteWatcher),
    fork(sitesCollectionWatcher),
  ];
}
