import test from 'ava';
import * as a from '../actions';
import * as r from '../reducers';

test('isLoggedIn', t => {
  t.false(r.isLoggedIn(undefined, {}));
  t.true(r.isLoggedIn(false, a.loginSucceed()));
  t.false(r.isLoggedIn(true, a.logoutSucceed()));
});

test('userId', t => {
  t.is(r.userId(undefined, {}), null);
  t.is(r.userId(null, a.loginSucceed(1234)), 1234);
  t.is(r.userId(1234, a.logoutSucceed()), null);
});

test('isLoggingIn', t => {
  t.false(r.isLoggingIn(undefined, {}));
  t.true(r.isLoggingIn(false, a.loginRequested()));
  t.false(r.isLoggingIn(true, a.loginFailed()));
  t.false(r.isLoggingIn(true, a.loginSucceed()));
});

test('loginStatus', t => {
  const status = {};
  t.false(r.loginStatus(undefined, {}));
  t.is(r.loginStatus(false, a.loginStatusChanged(status)), status);
  t.false(r.loginStatus(status, a.loginSucceed()));
  t.false(r.loginStatus(status, a.loginFailed()));
});

test('logoutStatus', t => {
  const status = {};
  t.false(r.logoutStatus(undefined, {}));
  t.is(r.logoutStatus(false, a.logoutStatusChanged(status)), status);
  t.false(r.logoutStatus(status, a.logoutSucceed()));
  t.false(r.logoutStatus(status, a.logoutFailed()));
});

test('loginError', t => {
  const error = {};
  t.false(r.loginError(undefined, {}));
  t.is(r.loginError(false, a.loginFailed(error)), error);
  t.false(r.loginError(error, a.loginRequested()));
  t.false(r.loginError(error, a.loginSucceed()));
});

test('logoutError', t => {
  const error = {};
  t.false(r.logoutError(undefined, {}));
  t.is(r.logoutError(false, a.logoutFailed(error)), error);
  t.false(r.logoutError(error, a.logoutRequested()));
  t.false(r.logoutError(error, a.logoutSucceed()));
});

test('isLoggingOut', t => {
  t.false(r.isLoggingOut(undefined, {}));
  t.true(r.isLoggingOut(false, a.logoutRequested()));
  t.false(r.isLoggingOut(true, a.logoutFailed()));
  t.false(r.isLoggingOut(true, a.logoutSucceed()));
});

test('isCreatingAccount', t => {
  t.false(r.isCreatingAccount(undefined, {}));
  t.true(r.isCreatingAccount(false, a.createAccountRequested()));
  t.false(r.isCreatingAccount(true, a.createAccountFailed()));
  t.false(r.isCreatingAccount(true, a.createAccountSucceed()));
});

test('createAccountStatus', t => {
  const status = {};
  t.false(r.createAccountStatus(undefined, {}));
  t.is(r.createAccountStatus(false, a.createAccountStatusChanged(status)), status);
  t.false(r.createAccountStatus(status, a.createAccountSucceed()));
  t.false(r.createAccountStatus(status, a.createAccountFailed()));
});

test('createAccountError', t => {
  const error = {};
  t.false(r.createAccountError(undefined, {}));
  t.is(r.createAccountError(false, a.createAccountFailed(error)), error);
  t.false(r.createAccountError(error, a.createAccountRequested()));
  t.false(r.createAccountError(error, a.createAccountSucceed()));
});

test('isFirstLogin', t => {
  t.false(r.isFirstLogin(undefined, {}));
  t.true(r.isFirstLogin(false, a.createAccountSucceed()));
  t.false(r.isFirstLogin(true, a.logoutSucceed()));
});
