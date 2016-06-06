import { fork } from 'redux-saga/effects';
import accounts from 'accounts/sagas';
import connection from 'connection/sagas';
import sites from 'sites/sagas';

export default function* rootSaga() {
  yield [
    fork(accounts),
    fork(connection),
    fork(sites),
  ];
}
