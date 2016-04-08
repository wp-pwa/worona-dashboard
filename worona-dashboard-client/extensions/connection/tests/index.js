import test from 'ava';
import sinon from 'sinon';
import { connection, login, logout } from '../lib';

sinon.spy(connection, 'loginWithPassword');

test.beforeEach(() => {
  connection.loginWithPassword.reset();
});

test('login with password and username', t => {
  login({
    username: 'TestUser',
    password: '1234',
  });
  t.true(connection.loginWithPassword.calledWith({
    username: 'TestUser',
    password: '1234',
    email: undefined,
  }));
});

test('login with password and email', t => {
  login({
    email: 'test@user.com',
    password: '1234',
  });
  t.true(connection.loginWithPassword.calledWith({
    email: 'test@user.com',
    password: '1234',
    username: undefined,
  }));
});

test('logout', t => {
  sinon.spy(connection, 'logout');
  logout({});
  t.true(connection.logout.called);
});
