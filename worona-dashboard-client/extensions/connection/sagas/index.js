import { fork } from 'redux-saga/effects';
import connectionStarter from './connection-starter';

export default function* () {
  yield [
    fork(connectionStarter),
  ];
}
