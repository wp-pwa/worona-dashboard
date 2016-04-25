import test from 'ava';
import {
  loginRequested,
  loginSucceed,
  loginFailed,
  logoutRequested,
  logoutSucceed,
  logoutFailed,
  createAccountRequested,
  createAccountSucceed,
  createAccountFailed,
} from '../actions';
import { isLoggedIn, isLoggingIn, isLoggingOut, isCreatingAccount } from '../reducers';

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
