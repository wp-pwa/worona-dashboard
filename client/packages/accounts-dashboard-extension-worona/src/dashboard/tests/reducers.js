import test from 'ava';
import * as actions from '../actions';
import * as reducers from '../reducers';

test('isLoggedIn', t => {
  t.false(reducers.isLoggedIn(undefined, {}));
  t.true(reducers.isLoggedIn(false, actions.loginSucceed()));
  t.false(reducers.isLoggedIn(true, actions.logoutSucceed()));
});

test('userId', t => {
  t.is(reducers.userId(undefined, {}), null);
  t.is(reducers.userId(null, actions.loginSucceed(1234)), 1234);
  t.is(reducers.userId(1234, actions.logoutSucceed()), null);
});

test('isLoggingIn', t => {
  t.false(reducers.isLoggingIn(undefined, {}));
  t.true(reducers.isLoggingIn(false, actions.loginRequested()));
  t.false(reducers.isLoggingIn(true, actions.loginFailed()));
  t.false(reducers.isLoggingIn(true, actions.loginSucceed()));
});

test('loginStatus', t => {
  const status = {};
  t.false(reducers.loginStatus(undefined, {}));
  t.is(reducers.loginStatus(false, actions.loginStatusChanged(status)), status);
  t.false(reducers.loginStatus(status, actions.loginSucceed()));
  t.false(reducers.loginStatus(status, actions.loginFailed()));
});

test('logoutStatus', t => {
  const status = {};
  t.false(reducers.logoutStatus(undefined, {}));
  t.is(reducers.logoutStatus(false, actions.logoutStatusChanged(status)), status);
  t.false(reducers.logoutStatus(status, actions.logoutSucceed()));
  t.false(reducers.logoutStatus(status, actions.logoutFailed()));
});

test('loginError', t => {
  const msg = 'Some Account Error';
  const error = new Error(msg);
  t.false(reducers.loginError(undefined, {}));
  t.is(reducers.loginError(false, actions.loginFailed(error)), msg);
  t.false(reducers.loginError(error, actions.loginRequested()));
  t.false(reducers.loginError(error, actions.loginSucceed()));
});

test('logoutError', t => {
  const msg = 'Some Account Error';
  const error = new Error(msg);
  t.false(reducers.logoutError(undefined, {}));
  t.is(reducers.logoutError(false, actions.logoutFailed(error)), msg);
  t.false(reducers.logoutError(error, actions.logoutRequested()));
  t.false(reducers.logoutError(error, actions.logoutSucceed()));
});

test('isLoggingOut', t => {
  t.false(reducers.isLoggingOut(undefined, {}));
  t.true(reducers.isLoggingOut(false, actions.logoutRequested()));
  t.false(reducers.isLoggingOut(true, actions.logoutFailed()));
  t.false(reducers.isLoggingOut(true, actions.logoutSucceed()));
});

test('isCreatingAccount', t => {
  t.false(reducers.isCreatingAccount(undefined, {}));
  t.true(reducers.isCreatingAccount(false, actions.createAccountRequested()));
  t.false(reducers.isCreatingAccount(true, actions.createAccountFailed()));
  t.false(reducers.isCreatingAccount(true, actions.createAccountSucceed()));
});

test('createAccountStatus', t => {
  const status = {};
  t.false(reducers.createAccountStatus(undefined, {}));
  t.is(reducers.createAccountStatus(false, actions.createAccountStatusChanged(status)), status);
  t.false(reducers.createAccountStatus(status, actions.createAccountSucceed()));
  t.false(reducers.createAccountStatus(status, actions.createAccountFailed()));
});

test('createAccountError', t => {
  const msg = 'Some Account Error';
  const error = new Error(msg);
  t.false(reducers.createAccountError(undefined, {}));
  t.is(reducers.createAccountError(false, actions.createAccountFailed(error)), msg);
  t.false(reducers.createAccountError(error, actions.createAccountRequested()));
  t.false(reducers.createAccountError(error, actions.createAccountSucceed()));
});

test('isFirstLogin', t => {
  t.false(reducers.isFirstLogin(undefined, {}));
  t.true(reducers.isFirstLogin(false, actions.createAccountSucceed()));
  t.false(reducers.isFirstLogin(true, actions.logoutSucceed()));
});
