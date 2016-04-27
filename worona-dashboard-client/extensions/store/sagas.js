import 'babel-polyfill';
import { fork } from 'redux-saga/effects';
import accounts from 'accounts/sagas';
import connection from 'connection/sagas';

export default function* rootSaga() {
  yield [
    fork(accounts),
    fork(connection),
  ];
}
