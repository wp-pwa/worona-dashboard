import { fork } from 'redux-saga/effects';
import createAccount from './createAccount';
import login from './login';
import logout from './logout';

export default function* sagas() {
  yield [
    fork(createAccount),
    fork(login),
    fork(logout),
  ];
}
