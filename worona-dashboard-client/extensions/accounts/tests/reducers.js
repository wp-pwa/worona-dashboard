import test from 'ava';
import { isLoggedIn, isLoggingIn, isLoggingOut, isCreatingAccount } from '../reducers';

test('isLoggedIn', t => {
  t.false(isLoggedIn(undefined, {}));
  t.true(isLoggedIn(false, { type: 'LOGIN_SUCCEED' }));
  t.false(isLoggedIn(true, { type: 'LOGOUT_SUCCEED' }));
});

test('isLoggingIn', t => {
  t.false(isLoggingIn(undefined, {}));
  t.true(isLoggingIn(false, { type: 'LOGIN_REQUEST' }));
  t.false(isLoggingIn(true, { type: 'LOGIN_FAILED' }));
  t.false(isLoggingIn(true, { type: 'LOGIN_SUCCEED' }));
});

test('isLoggingOut', t => {
  t.false(isLoggingOut(undefined, {}));
  t.true(isLoggingOut(false, { type: 'LOGOUT_REQUEST' }));
  t.false(isLoggingOut(true, { type: 'LOGOUT_FAILED' }));
  t.false(isLoggingOut(true, { type: 'LOGOUT_SUCCEED' }));
});

test('isCreatingAccount', t => {
  t.false(isCreatingAccount(undefined, {}));
  t.true(isCreatingAccount(false, { type: 'CREATE_ACCOUNT_REQUEST' }));
  t.false(isCreatingAccount(true, { type: 'CREATE_ACCOUNT_FAILURE' }));
  t.false(isCreatingAccount(true, { type: 'CREATE_ACCOUNT_SUCCESS' }));
});
