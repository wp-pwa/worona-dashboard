import test from 'ava';
import sinon from 'sinon';
import { createSite } from '../libs';

test('createSite with id', t => {
  const caller = sinon.stub();
  const action = { name: 'name', url: 'url', _id: '1234' };
  createSite(Object.assign({}, action, { caller }));
  t.true(caller.calledWith('createSite', action));
});
