import test from 'ava';
import sinon from 'sinon';
import * as libs from '../libs';

test('createAccount', t => {
  const api = sinon.spy();
  libs.createAccount('name', 'email', 'password', api);
  t.true(api.calledWith('createAccount', 'name', 'email', 'password'));
});
