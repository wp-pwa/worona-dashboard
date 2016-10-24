import { fork } from 'redux-saga/effects';
import connectionStarter from './connection-starter';

export default function* connectionSagas() {
  yield [
    fork(connectionStarter),
  ];
}
