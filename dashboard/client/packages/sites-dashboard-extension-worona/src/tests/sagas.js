import test from 'ava';
import { mock } from 'worona-deps';
import { call, put } from 'redux-saga/effects';
import { createSiteSaga } from '../sagas/createSite';
import { CREATING_SITE } from '../messages';
import * as libs from '../libs';
import * as actions from '../actions';
import * as deps from '../dependencies';

mock(deps);

test('createSiteSaga succeed', t => {
  const action = { name: 'name', url: 'url', _id: '1234' };
  const siteId = {};
  const gen = createSiteSaga(action);
  t.deepEqual(gen.next().value, put(actions.createSiteStatusChanged(CREATING_SITE)));
  t.deepEqual(gen.next().value, call(libs.createSite, action));
  t.deepEqual(gen.next(siteId).value, put(actions.createSiteSucceed(siteId)));
  t.deepEqual(gen.next().value, call(deps.libs.push, '/'));
  t.true(gen.next().done);
});

test('createSiteSaga failed', t => {
  const action = { name: 'name', url: 'url', _id: '1234' };
  const error = {};
  const gen = createSiteSaga(action);
  t.deepEqual(gen.next().value, put(actions.createSiteStatusChanged(CREATING_SITE)));
  t.deepEqual(gen.next().value, call(libs.createSite, action));
  t.deepEqual(gen.throw(error).value, put(actions.createSiteFailed(error)));
  t.true(gen.next().done);
});
