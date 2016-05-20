import test from 'ava';
import { call, put } from 'redux-saga/effects';
import { createSiteSaga } from '../sagas/createSite';
import { createSite } from '../libs';
import { createSiteSucceed, createSiteFailed, createSiteStatusChanged } from '../actions';
import { CREATING_SITE } from '../messages';

test('createSiteSaga succeed', t => {
  const action = { name: 'name', url: 'url', _id: '1234' };
  const siteId = {};
  const gen = createSiteSaga(action);
  t.deepEqual(gen.next().value, put(createSiteStatusChanged(CREATING_SITE)));
  t.deepEqual(gen.next().value, call(createSite, action));
  t.deepEqual(gen.next(siteId).value, put(createSiteSucceed(siteId)));
  t.true(gen.next().done);
});

test('createSiteSaga failed', t => {
  const action = { name: 'name', url: 'url', _id: '1234' };
  const error = {};
  const gen = createSiteSaga(action);
  t.deepEqual(gen.next().value, put(createSiteStatusChanged(CREATING_SITE)));
  t.deepEqual(gen.next().value, call(createSite, action));
  t.deepEqual(gen.throw(error).value, put(createSiteFailed(error)));
  t.true(gen.next().done);
});
