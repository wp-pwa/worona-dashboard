import { fork } from 'redux-saga/effects';
import { publishSiteWatcher } from './publishSite';

export default function* siteSagas() {
  yield [
    fork(publishSiteWatcher),
  ];
}
