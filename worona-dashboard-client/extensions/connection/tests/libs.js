import test from 'ava';
import sinon from 'sinon';
import { Connection } from '../libs';

let connection = null;

test.beforeEach(() => {
  connection = new Connection({ url: 'ws://test' });
});

test.afterEach(() => {
  connection = null;
});

test('start', t => {
  t.falsy(connection._client);
  connection.start();
  t.is(connection._client.endpoint, 'ws://test');
});

test('connect', t => {
  connection.start();
  sinon.spy(connection._client.ddp, 'connect');
  connection.connect();
  t.true(connection._client.ddp.connect.called);
});

test('connectedEventChannel', t => {
  connection.start();
  sinon.spy(connection._client.ddp, 'on');
  sinon.spy(connection._client.ddp, 'removeListener');
  const channel = connection.connectedEventChannel();
  t.true(connection._client.ddp.on.calledWith('connected'));
  channel.close();
  t.true(connection._client.ddp.removeListener.calledWith('connected'));
});

test('disconnectedEventChannel', t => {
  connection.start();
  sinon.spy(connection._client.ddp, 'on');
  sinon.spy(connection._client.ddp, 'removeListener');
  const channel = connection.disconnectedEventChannel();
  t.true(connection._client.ddp.on.calledWith('disconnected'));
  channel.close();
  t.true(connection._client.ddp.removeListener.calledWith('disconnected'));
});

test('call success', t => {
  connection.start();
  const call = sinon.stub(connection._client, 'call');
  const userId = {};
  call.returns(Promise.resolve(userId));
  connection.call('createAccount', 'name', 'password').then(result => t.is(userId, result));
  t.true(connection._client.call.calledWith('createAccount', 'name', 'password'));
});

test('call throws', t => {
  connection.start();
  const call = sinon.stub(connection._client, 'call');
  const error = {};
  call.returns(Promise.reject(error));
  connection.call('createAccount', 'name', 'password').catch(err => t.is(err, error));
  t.true(connection._client.call.calledWith('createAccount', 'name', 'password'));
});

test('call throws with Meteor Error', t => {
  connection.start();
  const call = sinon.stub(connection._client, 'call');
  const meteorError = { errorType: 'Meteor.Error' };
  call.returns(Promise.resolve(meteorError));
  connection.call('createAccount', 'name', 'password').catch(err => t.is(err, meteorError));
  t.true(connection._client.call.calledWith('createAccount', 'name', 'password'));
});

test('loginWithPassword', t => {
  connection.start();
  const login = sinon.stub(connection._client, 'loginWithPassword');
  login.returns(1234);
  const userId = connection.loginWithPassword('email', 'password');
  t.is(userId, 1234);
  t.true(connection._client.loginWithPassword.calledWith({ email: 'email', password: 'password' }));
});

test('logout', t => {
  connection.start();
  sinon.spy(connection._client, 'logout');
  connection.logout();
  t.true(connection._client.logout.called);
});

test('loggedInEventChannel', t => {
  connection.start();
  sinon.spy(connection._client, 'on');
  sinon.spy(connection._client, 'removeListener');
  const channel = connection.loggedInEventChannel();
  t.true(connection._client.on.calledWith('loggedIn'));
  channel.close();
  t.true(connection._client.removeListener.calledWith('loggedIn'));
});

test('loggedOutEventChannel', t => {
  connection.start();
  sinon.spy(connection._client, 'on');
  sinon.spy(connection._client, 'removeListener');
  const channel = connection.loggedOutEventChannel();
  t.true(connection._client.on.calledWith('loggedOut'));
  channel.close();
  t.true(connection._client.removeListener.calledWith('loggedOut'));
});

test('subscribe', t => {
  connection.start();
  sinon.spy(connection._client, 'subscribe');
  const params = {};
  connection.subscribe(params);
  t.true(connection._client.subscribe.calledWith(params));
});

test('unsubscribe', t => {
  connection.start();
  sinon.spy(connection._client, 'unsubscribe');
  const id = {};
  connection.unsubscribe(id);
  t.true(connection._client.unsubscribe.calledWith(id));
});

test('collectionEventChannel', t => {
  connection.start();
  sinon.spy(connection._client.ddp, 'on');
  sinon.spy(connection._client.ddp, 'removeListener');
  const channel = connection.collectionEventChannel('somecollection');
  t.true(connection._client.ddp.on.calledWith('added'));
  t.true(connection._client.ddp.on.calledWith('changed'));
  t.true(connection._client.ddp.on.calledWith('removed'));
  channel.close();
  t.true(connection._client.ddp.removeListener.calledWith('added'));
  t.true(connection._client.ddp.removeListener.calledWith('changed'));
  t.true(connection._client.ddp.removeListener.calledWith('removed'));
});

test('readyEventChannel', t => {
  connection.start();
  const subscription = { on: sinon.stub(), removeListener: sinon.stub() };
  const channel = connection.readyEventChannel(subscription);
  t.true(subscription.on.calledWith('ready'));
  channel.close();
  t.true(subscription.removeListener.calledWith('ready'));
});

test('errorEventChannel', t => {
  connection.start();
  const subscription = { on: sinon.stub(), removeListener: sinon.stub() };
  const channel = connection.errorEventChannel(subscription);
  t.true(subscription.on.calledWith('error'));
  channel.close();
  t.true(subscription.removeListener.calledWith('error'));
});
