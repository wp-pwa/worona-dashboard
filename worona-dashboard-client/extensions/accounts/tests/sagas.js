import test from 'ava';
import { eventChannel } from 'redux-saga';
import { select, put, take, call, race } from 'redux-saga/effects';
import { createAccountSaga } from '../sagas/createAccount';
import { loginRequestedSaga, logEventsWatcher } from '../sagas/login';
import { isConnected } from '../selectors';
import { createAccountFailed, createAccountSucceed, createAccountStatusChanged, loginRequested,
  loginStatusChanged, loginSucceed, loginFailed, logoutSucceed } from '../creators';
import { CONNECTION_SUCCEED, LOGIN_SUCCEED, LOGOUT_SUCCEED } from '../actions';
import { NOT_CONNECTED, CREATING_ACCOUNT, CONNECTED_CREATING_ACCOUNT, CONNECTED_LOGIN_IN, LOGIN_IN }
  from '../messages';
import { createAccount, loginWithPassword, loggedInEventChannel, loggedOutEventChannel }
  from '../libs';

test('createAccountSaga not connected', t => {
  const action = { name: 'name', email: 'email', password: 'pass' };
  const gen = createAccountSaga(action);
  t.deepEqual(gen.next().value, select(isConnected));
  t.deepEqual(gen.next(false).value, put(createAccountStatusChanged(NOT_CONNECTED)));
  t.deepEqual(gen.next().value, take(CONNECTION_SUCCEED));
  t.deepEqual(gen.next({ type: CONNECTION_SUCCEED }).value,
    put(createAccountStatusChanged(CONNECTED_CREATING_ACCOUNT)));
  t.deepEqual(gen.next().value, call(createAccountSaga, action));
  t.is(gen.next().done, true);
});

test('createAccountSaga connected and succeed', t => {
  const actn = { name: 'name', email: 'email', password: 'pass' };
  const userId = {};
  const gen = createAccountSaga(actn);
  t.deepEqual(gen.next().value, select(isConnected));
  t.deepEqual(gen.next(true).value, put(createAccountStatusChanged(CREATING_ACCOUNT)));
  t.deepEqual(gen.next().value, call(createAccount, actn.name, actn.email, actn.password));
  t.deepEqual(gen.next(userId).value, put(createAccountSucceed(userId)));
  t.deepEqual(gen.next().value, put(loginRequested(actn.email, actn.password)));
  t.is(gen.next().done, true);
});

test('createAccountSaga connected and failed', t => {
  const actn = { name: 'name', email: 'email', password: 'pass' };
  const error = {};
  const gen = createAccountSaga(actn);
  t.deepEqual(gen.next().value, select(isConnected));
  t.deepEqual(gen.next(true).value, put(createAccountStatusChanged(CREATING_ACCOUNT)));
  t.deepEqual(gen.next().value, call(createAccount, actn.name, actn.email, actn.password));
  t.deepEqual(gen.throw(error).value, put(createAccountFailed(error)));
  t.is(gen.next().done, true);
});

test('loginRequestedSaga not connected', t => {
  const action = { email: 'email', password: 'pass' };
  const gen = loginRequestedSaga(action);
  t.deepEqual(gen.next().value, select(isConnected));
  t.deepEqual(gen.next(false).value, put(loginStatusChanged(NOT_CONNECTED)));
  t.deepEqual(gen.next().value, take(CONNECTION_SUCCEED));
  t.deepEqual(gen.next({ type: CONNECTION_SUCCEED }).value,
    put(loginStatusChanged(CONNECTED_LOGIN_IN)));
  t.deepEqual(gen.next().value, call(loginRequestedSaga, action));
  t.is(gen.next().done, true);
});

test('loginRequestedSaga connected and succeed', t => {
  const actn = { email: 'email', password: 'pass' };
  const userId = {};
  const loggedOutChannel = eventChannel(() => {});
  const gen = loginRequestedSaga(actn);
  t.deepEqual(gen.next().value, select(isConnected));
  t.deepEqual(gen.next(true).value, put(loginStatusChanged(LOGIN_IN)));
  t.deepEqual(gen.next().value, call(loginWithPassword, actn.email, actn.password));
  t.deepEqual(gen.next(userId).value, put(loginSucceed(userId)));
  t.deepEqual(gen.next().value, call(loggedOutEventChannel));
  t.deepEqual(gen.next(loggedOutChannel).value, take(loggedOutChannel));
  t.deepEqual(gen.next(userId).value, put(logoutSucceed()));
  t.is(gen.next().done, true);
});

test('loginRequestedSaga connected and failed', t => {
  const actn = { email: 'email', password: 'pass' };
  const error = {};
  const gen = loginRequestedSaga(actn);
  t.deepEqual(gen.next().value, select(isConnected));
  t.deepEqual(gen.next(true).value, put(loginStatusChanged(LOGIN_IN)));
  t.deepEqual(gen.next().value, call(loginWithPassword, actn.email, actn.password));
  t.deepEqual(gen.throw(error).value, put(loginFailed(error)));
  t.is(gen.next().done, true);
});

test('logEventsWatcher automatic login and normal logout', t => {
  const gen = logEventsWatcher();
  const loggedInEvents = eventChannel(() => {});
  const loggedOutEvents = eventChannel(() => {});
  t.deepEqual(gen.next().value, take(CONNECTION_SUCCEED));
  t.deepEqual(gen.next().value, call(loggedInEventChannel));
  t.deepEqual(gen.next(loggedInEvents).value, call(loggedOutEventChannel));
  t.deepEqual(gen.next(loggedOutEvents).value, race({
    automaticLogin: take(loggedInEvents),
    manualLogin: take(LOGIN_SUCCEED),
  }));
  t.deepEqual(gen.next({ automaticLogin: true }).value, put(loginSucceed()));
  t.deepEqual(gen.next().value, race({
    automaticLogout: take(loggedOutEvents),
    manualLogout: take(LOGOUT_SUCCEED),
  }));
  t.deepEqual(gen.next({ manualLogout: true }).value, race({
    automaticLogin: take(loggedInEvents),
    manualLogin: take(LOGIN_SUCCEED),
  }));
});

test('logEventsWatcher normal login and automatic logout', t => {
  const gen = logEventsWatcher();
  const loggedInEvents = eventChannel(() => {});
  const loggedOutEvents = eventChannel(() => {});
  t.deepEqual(gen.next().value, take(CONNECTION_SUCCEED));
  t.deepEqual(gen.next().value, call(loggedInEventChannel));
  t.deepEqual(gen.next(loggedInEvents).value, call(loggedOutEventChannel));
  t.deepEqual(gen.next(loggedOutEvents).value, race({
    automaticLogin: take(loggedInEvents),
    manualLogin: take(LOGIN_SUCCEED),
  }));
  t.deepEqual(gen.next({ manualLogin: true }).value, race({
    automaticLogout: take(loggedOutEvents),
    manualLogout: take(LOGOUT_SUCCEED),
  }));
  t.deepEqual(gen.next({ automaticLogout: true }).value, put(logoutSucceed()));
  t.deepEqual(gen.next({ manualLogout: true }).value, race({
    automaticLogin: take(loggedInEvents),
    manualLogin: take(LOGIN_SUCCEED),
  }));
});
