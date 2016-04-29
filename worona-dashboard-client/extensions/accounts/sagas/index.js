import { fork } from 'redux-saga/effects';
import createAccount from './createAccount';
import login from './login';

export default function* sagas() {
  yield [
    fork(createAccount),
    fork(login),
  ];
}
