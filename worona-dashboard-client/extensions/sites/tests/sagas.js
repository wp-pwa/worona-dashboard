import test from 'ava';
import { call, put, take } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import { createSiteSaga } from '../sagas/createSite';
import { sitesCollectionWatcher } from '../sagas/sitesCollection';
import { createSite, collectionEventChannel, subscribe } from '../libs';
import { createSiteSucceed, createSiteFailed, createSiteStatusChanged, siteCollectionModified }
  from '../actions';
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

test('sitesCollectionWatcher', t => {
  const gen = sitesCollectionWatcher();
  const channel = eventChannel(() => {});
  const event = { event: 'event', id: 'id', fields: 'fields' };
  t.deepEqual(gen.next().value, call(subscribe, 'sites'));
  t.deepEqual(gen.next().value, call(collectionEventChannel, 'sites'));
  t.deepEqual(gen.next(channel).value, take(channel));
  t.deepEqual(gen.next(event).value, put(siteCollectionModified('event', 'id', 'fields')));
  t.deepEqual(gen.next(channel).value, take(channel));
});
