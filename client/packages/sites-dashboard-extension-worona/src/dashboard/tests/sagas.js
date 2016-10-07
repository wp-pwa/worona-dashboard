import test from 'ava';
import { mock } from 'worona-deps';
import { call, put } from 'redux-saga/effects';
import { createSiteSaga } from '../sagas/createSite';
import { deleteSiteSaga } from '../sagas/deleteSite';
import { CREATING_SITE, DELETING_SITE } from '../messages';
import * as libs from '../libs';
import * as actions from '../actions';
import * as deps from '../dependencies';

mock(deps);

test('createSiteSaga succeed', t => {
  const action = { name: 'name', url: 'url', _id: '1234' };
  const finalURL = '/check-site/' + action._id;
  const gen = createSiteSaga(action);
  t.deepEqual(gen.next().value, put(actions.createSiteStatusChanged(CREATING_SITE)));
  t.deepEqual(gen.next().value, call(libs.createSite, action));
  t.deepEqual(gen.next(action._id).value, put(actions.createSiteSucceed(action._id)));
  t.deepEqual(gen.next().value, put(deps.actions.push(finalURL)));
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

test('deleteSiteSaga succeed', t => {
  const siteId = '1234';
  const action = { _id: siteId };
  const gen = deleteSiteSaga(action);
  t.deepEqual(gen.next().value, put(actions.deleteSiteStatusChanged(DELETING_SITE)));
  t.deepEqual(gen.next().value, call(libs.deleteSite, action));
  t.deepEqual(gen.next(siteId).value, put(actions.deleteSiteSucceed(siteId)));
  t.true(gen.next().done);
});

test('deleteSiteSaga failed', t => {
  const action = { _id: '1234' };
  const error = {};
  const gen = deleteSiteSaga(action);
  t.deepEqual(gen.next().value, put(actions.deleteSiteStatusChanged(DELETING_SITE)));
  t.deepEqual(gen.next().value, call(libs.deleteSite, action));
  t.deepEqual(gen.throw(error).value, put(actions.deleteSiteFailed(error)));
  t.true(gen.next().done);
});
