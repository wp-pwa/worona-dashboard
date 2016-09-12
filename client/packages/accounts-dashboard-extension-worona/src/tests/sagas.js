import test from 'ava';
import { mock } from 'worona-deps';
import { eventChannel } from 'redux-saga';
import { select, put, take, call, race } from 'redux-saga/effects';
import { createAccountSaga } from '../sagas/createAccount';
import { loginRequestedSaga, loginEvent, logoutEvent } from '../sagas/login';
import { logoutRequestedSaga } from '../sagas/logout';
import * as actions from '../actions';
import * as types from '../types';
import { NOT_CONNECTED, CREATING_ACCOUNT, CONNECTED_CREATING_ACCOUNT, CONNECTED_LOGIN_IN, LOGIN_IN }
  from '../messages';
import * as libs from '../libs';
import * as deps from '../dependencies';

mock(deps);

test('createAccountSaga not connected', t => {
  const action = { name: 'name', email: 'email', password: 'pass' };
  const gen = createAccountSaga(action);
  t.deepEqual(gen.next().value, select(deps.selectors.isConnected));
  t.deepEqual(gen.next(false).value, put(actions.createAccountStatusChanged(NOT_CONNECTED)));
  t.deepEqual(gen.next().value, take(deps.types.CONNECTION_SUCCEED));
  t.deepEqual(gen.next({ type: deps.types.CONNECTION_SUCCEED }).value,
    put(actions.createAccountStatusChanged(CONNECTED_CREATING_ACCOUNT)));
  t.deepEqual(gen.next().value, call(createAccountSaga, action));
  t.is(gen.next().done, true);
});

test('createAccountSaga connected and succeed', t => {
  const action = { name: 'name', email: 'email', password: 'pass' };
  const userId = {};
  const gen = createAccountSaga(action);
  t.deepEqual(gen.next().value, select(deps.selectors.isConnected));
  t.deepEqual(gen.next(true).value, put(actions.createAccountStatusChanged(CREATING_ACCOUNT)));
  t.deepEqual(gen.next().value,
    call(libs.createAccount, action.name, action.email, action.password));
  t.deepEqual(gen.next(userId).value, put(actions.createAccountSucceed(userId)));
  t.deepEqual(gen.next().value, put(actions.loginRequested(action.email, action.password)));
  t.is(gen.next().done, true);
});

test('createAccountSaga connected and failed', t => {
  const actn = { name: 'name', email: 'email', password: 'pass' };
  const error = {};
  const gen = createAccountSaga(actn);
  t.deepEqual(gen.next().value, select(deps.selectors.isConnected));
  t.deepEqual(gen.next(true).value, put(actions.createAccountStatusChanged(CREATING_ACCOUNT)));
  t.deepEqual(gen.next().value, call(libs.createAccount, actn.name, actn.email, actn.password));
  t.deepEqual(gen.throw(error).value, put(actions.createAccountFailed(error)));
  t.is(gen.next().done, true);
});

test('loginRequestedSaga not connected', t => {
  const action = { email: 'email', password: 'pass' };
  const gen = loginRequestedSaga(action);
  t.deepEqual(gen.next().value, select(deps.selectors.isConnected));
  t.deepEqual(gen.next(false).value, put(actions.loginStatusChanged(NOT_CONNECTED)));
  t.deepEqual(gen.next().value, take(deps.types.CONNECTION_SUCCEED));
  t.deepEqual(gen.next({ type: deps.types.CONNECTION_SUCCEED }).value,
    put(actions.loginStatusChanged(CONNECTED_LOGIN_IN)));
  t.deepEqual(gen.next().value, call(loginRequestedSaga, action));
  t.is(gen.next().done, true);
});

test('loginRequestedSaga connected and succeed', t => {
  const actn = { email: 'email', password: 'pass' };
  const userId = {};
  const gen = loginRequestedSaga(actn);
  t.deepEqual(gen.next().value, select(deps.selectors.isConnected));
  t.deepEqual(gen.next(true).value, put(actions.loginStatusChanged(LOGIN_IN)));
  t.deepEqual(gen.next().value, call(deps.libs.loginWithPassword, actn.email, actn.password));
  t.deepEqual(gen.next(userId).value, put(actions.loginSucceed(userId)));
  t.is(gen.next().done, true);
});

test('loginRequestedSaga connected and failed', t => {
  const actn = { email: 'email', password: 'pass' };
  const error = {};
  const gen = loginRequestedSaga(actn);
  t.deepEqual(gen.next().value, select(deps.selectors.isConnected));
  t.deepEqual(gen.next(true).value, put(actions.loginStatusChanged(LOGIN_IN)));
  t.deepEqual(gen.next().value, call(deps.libs.loginWithPassword, actn.email, actn.password));
  t.deepEqual(gen.throw(error).value, put(actions.loginFailed(error)));
  t.is(gen.next().done, true);
});

test('loginEvent automatic login', t => {
  const loggedInEvents = eventChannel(() => {});
  const gen = loginEvent(loggedInEvents);
  const automaticLogin = { automaticLogin: 1234 };
  t.deepEqual(gen.next().value, race({
    automaticLogin: take(loggedInEvents),
    manualLogin: take(types.LOGIN_REQUESTED),
  }));
  t.deepEqual(gen.next(automaticLogin).value, put(actions.loginSucceed(1234)));
  t.true(gen.next().done);
});

test('loginEvent manual login with success', t => {
  const loggedInEvents = eventChannel(() => {});
  const gen = loginEvent(loggedInEvents);
  t.deepEqual(gen.next().value, race({
    automaticLogin: take(loggedInEvents),
    manualLogin: take(types.LOGIN_REQUESTED),
  }));
  t.deepEqual(gen.next({ manualLogin: true }).value, race({
    success: take(types.LOGIN_SUCCEED),
    failure: take(types.LOGIN_FAILED),
  }));
  t.true(gen.next({ success: true }).done);
});

test('loginEvent manual login with failure', t => {
  const loggedInEvents = eventChannel(() => {});
  const gen = loginEvent(loggedInEvents);
  t.deepEqual(gen.next().value, race({
    automaticLogin: take(loggedInEvents),
    manualLogin: take(types.LOGIN_REQUESTED),
  }));
  t.deepEqual(gen.next({ manualLogin: true }).value, race({
    success: take(types.LOGIN_SUCCEED),
    failure: take(types.LOGIN_FAILED),
  }));
  t.deepEqual(gen.next({ failure: true }).value, race({
    automaticLogin: take(loggedInEvents),
    manualLogin: take(types.LOGIN_REQUESTED),
  }));
});

test('logoutEvent automatic logout', t => {
  const loggedOutEvents = eventChannel(() => {});
  const gen = logoutEvent(loggedOutEvents);
  const automaticLogout = { automaticLogout: 1234 };
  t.deepEqual(gen.next().value, race({
    automaticLogout: take(loggedOutEvents),
    manualLogout: take(types.LOGOUT_REQUESTED),
  }));
  t.deepEqual(gen.next(automaticLogout).value, put(actions.logoutSucceed(1234)));
  t.true(gen.next().done);
});

test('logoutEvent manual login with success', t => {
  const loggedOutEvents = eventChannel(() => {});
  const gen = logoutEvent(loggedOutEvents);
  t.deepEqual(gen.next().value, race({
    automaticLogout: take(loggedOutEvents),
    manualLogout: take(types.LOGOUT_REQUESTED),
  }));
  t.deepEqual(gen.next({ manualLogout: true }).value, race({
    success: take(types.LOGOUT_SUCCEED),
    failure: take(types.LOGOUT_FAILED),
  }));
  t.true(gen.next({ success: true }).done);
});

test('logoutEvent manual login with failure', t => {
  const loggedOutEvents = eventChannel(() => {});
  const gen = logoutEvent(loggedOutEvents);
  t.deepEqual(gen.next().value, race({
    automaticLogout: take(loggedOutEvents),
    manualLogout: take(types.LOGOUT_REQUESTED),
  }));
  t.deepEqual(gen.next({ manualLogout: true }).value, race({
    success: take(types.LOGOUT_SUCCEED),
    failure: take(types.LOGOUT_FAILED),
  }));
  t.deepEqual(gen.next({ failure: true }).value, race({
    automaticLogout: take(loggedOutEvents),
    manualLogout: take(types.LOGOUT_REQUESTED),
  }));
});

test('logoutRequested succeed', t => {
  const gen = logoutRequestedSaga();
  t.deepEqual(gen.next().value, call(deps.libs.logout));
  t.deepEqual(gen.next().value, put(actions.logoutSucceed()));
});

test('logoutRequested failed', t => {
  const gen = logoutRequestedSaga();
  t.deepEqual(gen.next().value, call(deps.libs.logout));
  t.deepEqual(gen.throw().value, put(actions.logoutFailed()));
});
