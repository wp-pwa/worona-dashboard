import { fork } from 'redux-saga/effects';
import { createSiteWatcher } from './createSite';

export default function* () {
  yield [
    fork(createSiteWatcher),
  ];
}
