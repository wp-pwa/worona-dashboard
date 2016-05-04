import test from 'ava';
import { call } from 'redux-saga/effects';
import { createSiteSaga } from '../sagas/createSite';
import { createSite } from '../libs';

test('createSiteSaga', t => {
  const action = { name: 'name', url: 'url', _id: '1234' };
  const gen = createSiteSaga(action);
  t.deepEqual(gen.next().value, call(createSite, action));
});
