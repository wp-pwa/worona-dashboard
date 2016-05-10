import test from 'ava';
import { call, put, take, race } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import { createSiteSaga } from '../sagas/createSite';
import { sitesCollectionSaga, sitesCollectionWatcher } from '../sagas/sitesCollection';
import { createSite, collectionEventChannel, subscribe, unsubscribe } from '../libs';
import { createSiteSucceed, createSiteFailed, createSiteStatusChanged, sitesCollectionModified }
  from '../actions';
import { CREATING_SITE } from '../messages';
import { LOGIN_SUCCEED, LOGOUT_SUCCEED } from '../actiontypes';

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

test('sitesCollectionSaga, data-in loop', t => {
  const channel = eventChannel(() => {});
  const gen = sitesCollectionSaga(channel);
  const data = { event: 'event', id: 'id', fields: 'fields' };
  t.deepEqual(gen.next().value, race({
    data: take(channel),
    logout: take(LOGOUT_SUCCEED),
  }));
  t.deepEqual(gen.next({ data }).value, put(sitesCollectionModified('event', 'id', 'fields')));
  t.deepEqual(gen.next().value, race({
    data: take(channel),
    logout: take(LOGOUT_SUCCEED),
  }));
});

test('sitesCollectionSaga, logout loop', t => {
  const channel = eventChannel(() => {});
  const gen = sitesCollectionSaga(channel);
  t.deepEqual(gen.next().value, race({
    data: take(channel),
    logout: take(LOGOUT_SUCCEED),
  }));
  t.true(gen.next({ logout: true }).done);
});

test('sitesCollectionWatcher', t => {
  const channel = eventChannel(() => {});
  const gen = sitesCollectionWatcher();
  gen.next();
  t.deepEqual(gen.next(channel).value, take(LOGIN_SUCCEED));
  gen.next();
  t.deepEqual(gen.next({ id: 1 }).value, call(sitesCollectionSaga, channel));
  gen.next();
  t.deepEqual(gen.next().value, take(LOGIN_SUCCEED));
});
