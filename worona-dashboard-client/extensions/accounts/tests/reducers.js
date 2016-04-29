import test from 'ava';
import { loginRequested, loginStatusChanged, loginSucceed, loginFailed, logoutRequested,
  logoutSucceed, logoutFailed, createAccountRequested, createAccountStatusChanged,
  createAccountSucceed, createAccountFailed } from '../creators';
import { isLoggedIn, isLoggingIn, loginStatus, loginError, isLoggingOut, createAccountStatus,
  createAccountError, isCreatingAccount } from '../reducers';

test('isLoggedIn', t => {
  t.false(isLoggedIn(undefined, {}));
  t.true(isLoggedIn(false, loginSucceed()));
  t.false(isLoggedIn(true, logoutSucceed()));
});

test('isLoggingIn', t => {
  t.false(isLoggingIn(undefined, {}));
  t.true(isLoggingIn(false, loginRequested()));
  t.false(isLoggingIn(true, loginFailed()));
  t.false(isLoggingIn(true, loginSucceed()));
});

test('loginStatus', t => {
  const status = {};
  t.false(loginStatus(undefined, {}));
  t.is(loginStatus(false, loginStatusChanged(status)), status);
  t.false(loginStatus(status, loginSucceed()));
  t.false(loginStatus(status, loginFailed()));
});

test('loginError', t => {
  const error = {};
  t.false(loginError(undefined, {}));
  t.is(loginError(false, loginFailed(error)), error);
  t.false(loginError(error, loginRequested()));
  t.false(loginError(error, loginSucceed()));
});

test('isLoggingOut', t => {
  t.false(isLoggingOut(undefined, {}));
  t.true(isLoggingOut(false, logoutRequested()));
  t.false(isLoggingOut(true, logoutFailed()));
  t.false(isLoggingOut(true, logoutSucceed()));
});

test('isCreatingAccount', t => {
  t.false(isCreatingAccount(undefined, {}));
  t.true(isCreatingAccount(false, createAccountRequested()));
  t.false(isCreatingAccount(true, createAccountFailed()));
  t.false(isCreatingAccount(true, createAccountSucceed()));
});

test('createAccountStatus', t => {
  const status = {};
  t.false(createAccountStatus(undefined, {}));
  t.is(createAccountStatus(false, createAccountStatusChanged(status)), status);
  t.false(createAccountStatus(status, createAccountSucceed()));
  t.false(createAccountStatus(status, createAccountFailed()));
});

test('createAccountError', t => {
  const error = {};
  t.false(createAccountError(undefined, {}));
  t.is(createAccountError(false, createAccountFailed(error)), error);
  t.false(createAccountError(error, createAccountRequested()));
  t.false(createAccountError(error, createAccountSucceed()));
});
