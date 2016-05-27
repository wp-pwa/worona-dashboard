import test from 'ava';
import sinon from 'sinon';
import { createAccount } from '../libs';

test('createAccount', t => {
  const api = sinon.spy();
  createAccount('name', 'email', 'password', api);
  t.true(api.calledWith('createAccount', 'name', 'email', 'password'));
});
