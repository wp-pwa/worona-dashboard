import { put, call } from 'redux-saga/effects';
import { delay } from 'redux-saga/utils';
import { default as Connection, connected } from '../lib';
import { connectionRequested, connectionSucceed, connectionFailed } from '../actions';

export function* connectionSaga() {
  const connection = new Connection();
  if (typeof window !== 'undefined') {
    window.connection = connection;
  }
  yield call([connection, connection.start]);
  yield call([connection, connection.connect]);
  while (true) {
    try {
      // yield put(connectionRequested());
      yield call(connection.connected());
      console.log('conectado');
      // yield put(connectionSucceed());
      break;
    } catch (error) {
      console.log('no conectado');
      yield put(connectionFailed(error));
      yield call(delay, 5000);
    }
  }
}

export default [
  connectionSaga,
];
