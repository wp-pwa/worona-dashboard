import test from 'ava';
import sinon from 'sinon';
import { connection, login, logout } from '../lib';

sinon.spy(connection, 'loginWithPassword');

test.beforeEach(() => {
  connection.loginWithPassword.reset();
});

test('login with password and email', t => {
  login('john@smith.com', '1234');
  t.true(connection.loginWithPassword.calledWith({
    email: 'john@smith.com',
    password: '1234',
  }));
});

test('logout', t => {
  sinon.spy(connection, 'logout');
  logout();
  t.true(connection.logout.called);
});
