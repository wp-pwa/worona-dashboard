import { fork } from 'redux-saga/effects';
import createAccount from './createAccount';
import login from './login';
import logout from './logout';
import forgotPassword from './forgotPassword';
import recoverPassword from './recoverPassword';

export default function* sagas() {
  yield [
    fork(createAccount),
    fork(login),
    fork(logout),
    fork(recoverPassword),
    fork(forgotPassword),
  ];
}
