import test from 'ava';
import { call, put, select } from 'redux-saga/effects';
import { mock } from 'worona-deps';
import * as deps from '../dependencies';
import { createSiteSaga } from '../sagas/createSite';
import { deleteSiteSaga } from '../sagas/deleteSite';
import { checkSiteSaga, requestFunc } from '../sagas/checkSite';
import { CREATING_SITE, DELETING_SITE } from '../messages';
import * as libs from '../libs';
import * as actions from '../actions';
import * as selectors from '../selectors';
import * as errors from '../errors';

mock(deps);

test('createSiteSaga succeed', t => {
  const action = { name: 'name', url: 'url', _id: '1234' };
  const finalURL = '/check-site/' + action._id;
  const gen = createSiteSaga(action);
  t.deepEqual(gen.next().value, put(actions.createSiteStatusChanged(CREATING_SITE)));
  t.deepEqual(gen.next().value, call(libs.createSite, action));
  t.deepEqual(gen.next(action._id).value, put(actions.createSiteSucceed(action._id)));
  t.deepEqual(gen.next().value, call(deps.libs.push, finalURL));
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

test('checkSiteSaga: succeed', t => {
  const siteId = '1234';
  const url = 'http://www.example.net/';
  const site = { url, id: siteId };
  const res = { status: 200, type: 'application/json', body: { siteId } };
  const gen = checkSiteSaga();
  t.deepEqual(gen.next().value, deps.sagaCreators.waitForReadySubscription('sites', selectors.getIsReadySites));
  t.deepEqual(gen.next().value, select(selectors.getSelectedSite));
  t.deepEqual(gen.next(site).value, call(requestFunc, url));
  t.deepEqual(gen.next(res).value, put(actions.checkSiteSucceed()));
  t.true(gen.next().done);
});

test('checkSiteSaga failed: superagent throws an error', t => {
  const siteId = '1234';
  const url = '';
  const action = { url, _id: siteId };
  const error = {};
  const gen = checkSiteSaga(action);
  t.deepEqual(gen.next().value, call(requestFunc, url));
  t.deepEqual(gen.throw(error).value, put(actions.checkSiteFailed(error)));
  t.true(gen.next().done);
});

test("checkSiteSaga failed: Site server doesn't respond 200", t => {
  const siteId = '1234';
  const url = 'http://www.example.net/';
  const action = { url, _id: siteId };
  const res = { status: 404 };
  const error = new Error(errors.RESPONSE_NOT_200);
  const gen = checkSiteSaga(action);
  t.deepEqual(gen.next().value, call(requestFunc, url));
  t.deepEqual(gen.next(res).value, put(actions.checkSiteFailed(error)));
  t.true(gen.next().done);
});

test("checkSiteSaga failed: Site hasn't WP API installed", t => {
  const siteId = '1234';
  const url = 'http://www.example.net/';
  const action = { url, _id: siteId };
  const res = { status: 200, type: 'text/html' };
  const error = new Error(errors.WP_API_NOT_FOUND);
  const gen = checkSiteSaga(action);
  t.deepEqual(gen.next().value, call(requestFunc, url));
  t.deepEqual(gen.next(res).value, put(actions.checkSiteFailed(error)));
  t.true(gen.next().done);
});

test("checkSiteSaga failed: Site hasn't Worona WP plugin installed", t => {
  const siteId = '1234';
  const url = 'http://www.example.net/';
  const action = { url, _id: siteId };
  const res = { status: 404, type: 'application/json', body: { siteId: '1234' } };
  const error = new Error(errors.WORONA_PLUGIN_NOT_FOUND);
  const gen = checkSiteSaga(action);
  t.deepEqual(gen.next().value, call(requestFunc, url));
  t.deepEqual(gen.next(res).value, put(actions.checkSiteFailed(error)));
  t.true(gen.next().done);
});


test("checkSiteSaga failed: Site Ids don't match", t => {
  const siteId = '1234';
  const url = 'http://www.example.net/';
  const action = { url, _id: siteId };
  const res = { status: 200, type: 'application/json', body: { siteId: '4321' } };
  const error = new Error(errors.SITEID_DONT_MATCH);
  const gen = checkSiteSaga(action);
  t.deepEqual(gen.next().value, call(requestFunc, url));
  t.deepEqual(gen.next(res).value, put(actions.checkSiteFailed(error)));
  t.true(gen.next().done);
});
