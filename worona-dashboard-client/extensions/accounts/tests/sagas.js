import test from 'ava';
import { call, put } from 'redux-saga/effects';
import browserHistory from '../../router/browserHistory';
import { createAccountSaga, loginSucceedSaga } from '../sagas';
import { createAccountSucceed, loginSucceed } from '../actions';
import { createAccount } from '../../connection/lib/index.js';

test('create account success', t => {
  const action = { name: 'John', email: 'john@smith.com', password: 'pass' };
  const userId = 1234;
  const gen = createAccountSaga(action);
  t.deepEqual(gen.next().value, call(createAccount, action.name, action.email, action.password));
  t.deepEqual(gen.next(userId).value, put(createAccountSucceed(userId)));
  t.deepEqual(gen.next().value, put(loginSucceed(userId)));
});

test('redirect after login', t => {
  const gen = loginSucceedSaga();
  t.deepEqual(gen.next().value, call(browserHistory.push, '/'));
});
