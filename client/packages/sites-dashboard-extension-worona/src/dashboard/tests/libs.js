import test from 'ava';
import sinon from 'sinon';
import { createSite, deleteSite } from '../libs';

test('createSite with id', t => {
  const caller = sinon.stub();
  const action = { name: 'name', url: 'url', _id: '1234' };
  createSite(Object.assign({}, action, { caller }));
  t.true(caller.calledWith('createSite', action));
});

test('createSite without id', t => {
  const caller = sinon.stub();
  const action = { name: 'name', url: 'url', _id: undefined };
  createSite(Object.assign({}, action, { caller }));
  t.true(caller.calledWith('createSite', action));
});

test('deleteSite', t => {
  const caller = sinon.stub();
  const action = { _id: '1234' };
  deleteSite(Object.assign({}, action, { caller }));
  t.true(caller.calledWith('deleteSite', action));
});
