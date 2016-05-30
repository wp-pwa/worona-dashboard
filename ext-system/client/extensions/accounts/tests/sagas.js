import test from 'ava';
import { eventChannel } from 'redux-saga';
import { select, put, take, call, race } from 'redux-saga/effects';
import { createAccountSaga } from '../sagas/createAccount';
import { loginRequestedSaga, loginEvent, logoutEvent } from '../sagas/login';
import { logoutRequestedSaga } from '../sagas/logout';
import { createAccountFailed, createAccountSucceed, createAccountStatusChanged, loginRequested,
  loginStatusChanged, loginSucceed, loginFailed, logoutSucceed, logoutFailed } from '../actions';
import { LOGIN_REQUESTED, LOGIN_SUCCEED, LOGIN_FAILED, LOGOUT_REQUESTED, LOGOUT_SUCCEED,
  LOGOUT_FAILED } from '../actiontypes';
import { NOT_CONNECTED, CREATING_ACCOUNT, CONNECTED_CREATING_ACCOUNT, CONNECTED_LOGIN_IN, LOGIN_IN }
  from '../messages';
import { createAccount } from '../libs';
import { CONNECTION_SUCCEED, isConnected, loginWithPassword, logout } from '../dependencies';

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
  const action = { name: 'name', email: 'email', password: 'pass' };
  const userId = {};
  const gen = createAccountSaga(action);
  t.deepEqual(gen.next().value, select(isConnected));
  t.deepEqual(gen.next(true).value, put(createAccountStatusChanged(CREATING_ACCOUNT)));
  t.deepEqual(gen.next().value, call(createAccount, action.name, action.email, action.password));
  t.deepEqual(gen.next(userId).value, put(createAccountSucceed(userId)));
  t.deepEqual(gen.next().value, put(loginRequested(action.email, action.password)));
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
  const gen = loginRequestedSaga(actn);
  t.deepEqual(gen.next().value, select(isConnected));
  t.deepEqual(gen.next(true).value, put(loginStatusChanged(LOGIN_IN)));
  t.deepEqual(gen.next().value, call(loginWithPassword, actn.email, actn.password));
  t.deepEqual(gen.next(userId).value, put(loginSucceed(userId)));
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

test('loginEvent automatic login', t => {
  const loggedInEvents = eventChannel(() => {});
  const gen = loginEvent(loggedInEvents);
  const automaticLogin = { automaticLogin: 1234 };
  t.deepEqual(gen.next().value, race({
    automaticLogin: take(loggedInEvents),
    manualLogin: take(LOGIN_REQUESTED),
  }));
  t.deepEqual(gen.next(automaticLogin).value, put(loginSucceed(1234)));
  t.true(gen.next().done);
});

test('loginEvent manual login with success', t => {
  const loggedInEvents = eventChannel(() => {});
  const gen = loginEvent(loggedInEvents);
  t.deepEqual(gen.next().value, race({
    automaticLogin: take(loggedInEvents),
    manualLogin: take(LOGIN_REQUESTED),
  }));
  t.deepEqual(gen.next({ manualLogin: true }).value, race({
    success: take(LOGIN_SUCCEED),
    failure: take(LOGIN_FAILED),
  }));
  t.true(gen.next({ success: true }).done);
});

test('loginEvent manual login with failure', t => {
  const loggedInEvents = eventChannel(() => {});
  const gen = loginEvent(loggedInEvents);
  t.deepEqual(gen.next().value, race({
    automaticLogin: take(loggedInEvents),
    manualLogin: take(LOGIN_REQUESTED),
  }));
  t.deepEqual(gen.next({ manualLogin: true }).value, race({
    success: take(LOGIN_SUCCEED),
    failure: take(LOGIN_FAILED),
  }));
  t.deepEqual(gen.next({ failure: true }).value, race({
    automaticLogin: take(loggedInEvents),
    manualLogin: take(LOGIN_REQUESTED),
  }));
});

test('logoutEvent automatic logout', t => {
  const loggedOutEvents = eventChannel(() => {});
  const gen = logoutEvent(loggedOutEvents);
  const automaticLogout = { automaticLogout: 1234 };
  t.deepEqual(gen.next().value, race({
    automaticLogout: take(loggedOutEvents),
    manualLogout: take(LOGOUT_REQUESTED),
  }));
  t.deepEqual(gen.next(automaticLogout).value, put(logoutSucceed(1234)));
  t.true(gen.next().done);
});

test('logoutEvent manual login with success', t => {
  const loggedOutEvents = eventChannel(() => {});
  const gen = logoutEvent(loggedOutEvents);
  t.deepEqual(gen.next().value, race({
    automaticLogout: take(loggedOutEvents),
    manualLogout: take(LOGOUT_REQUESTED),
  }));
  t.deepEqual(gen.next({ manualLogout: true }).value, race({
    success: take(LOGOUT_SUCCEED),
    failure: take(LOGOUT_FAILED),
  }));
  t.true(gen.next({ success: true }).done);
});

test('logoutEvent manual login with failure', t => {
  const loggedOutEvents = eventChannel(() => {});
  const gen = logoutEvent(loggedOutEvents);
  t.deepEqual(gen.next().value, race({
    automaticLogout: take(loggedOutEvents),
    manualLogout: take(LOGOUT_REQUESTED),
  }));
  t.deepEqual(gen.next({ manualLogout: true }).value, race({
    success: take(LOGOUT_SUCCEED),
    failure: take(LOGOUT_FAILED),
  }));
  t.deepEqual(gen.next({ failure: true }).value, race({
    automaticLogout: take(loggedOutEvents),
    manualLogout: take(LOGOUT_REQUESTED),
  }));
});

test('logoutRequested succeed', t => {
  const gen = logoutRequestedSaga();
  t.deepEqual(gen.next().value, call(logout));
  t.deepEqual(gen.next().value, put(logoutSucceed()));
});

test('logoutRequested failed', t => {
  const gen = logoutRequestedSaga();
  t.deepEqual(gen.next().value, call(logout));
  t.deepEqual(gen.throw().value, put(logoutFailed()));
});
