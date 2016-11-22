import { fork } from 'redux-saga/effects';
import { setIconSiteSagaWatcher } from './setIconSite';

export default function* siteSagas() {
  yield [
    fork(setIconSiteSagaWatcher),
  ];
}
