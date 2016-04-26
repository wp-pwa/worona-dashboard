import test from 'ava';
import sinon from 'sinon';
import {
  connection,
  connect,
  disconnect,
  login,
  logout,
  createAccount,
} from '../lib';

test.before(() => {
  sinon.spy(connection, 'call');
});

test.beforeEach(() => {
  connection.call.reset();
});

test('connect', t => {
  sinon.spy(connection.ddp, 'connect');
  connect();
  t.true(connection.ddp.connect.called);
});

test('disconnect', t => {
  sinon.spy(connection.ddp, 'disconnect');
  disconnect();
  t.true(connection.ddp.disconnect.called);
});

test('login with password and email', t => {
  sinon.spy(connection, 'loginWithPassword');
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

test('createAccount', t => {
  createAccount('john@smith.com', 'pass');
  t.true(connection.call.calledWith('createAccount', 'john@smith.com', 'pass'));
});
