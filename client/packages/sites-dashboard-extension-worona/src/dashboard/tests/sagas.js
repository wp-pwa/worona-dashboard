/* eslint-disable no-underscore-dangle */
import test from 'ava';
import { delay } from 'redux-saga';
import { call, put, select, race } from 'redux-saga/effects';
import stringifyError from 'stringify-error-message';

import * as deps from '../deps';
import { createSiteSaga } from '../sagas/createSite';
import { deleteSiteSaga } from '../sagas/deleteSite';
import { checkSiteSaga, requestFunc, checkSiteFailedSaga } from '../sagas/checkSite';
import { CREATING_SITE, DELETING_SITE } from '../messages';
import * as libs from '../libs';
import * as actions from '../actions';
import * as selectors from '../selectors';
import * as errors from '../errors';


test('createSiteSaga succeed', t => {
  const action = { name: 'name', url: 'url', _id: '1234' };
  const finalURL = `/check-site/${action._id}`;
  const gen = createSiteSaga(action);
  t.deepEqual(gen.next().value, deps.sagaHelpers.waitForConnectionEstablished());
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
  t.deepEqual(gen.next().value, deps.sagaHelpers.waitForConnectionEstablished());
  t.deepEqual(gen.next().value, put(actions.createSiteStatusChanged(CREATING_SITE)));
  t.deepEqual(gen.next().value, call(libs.createSite, action));
  t.deepEqual(gen.throw(error).value, put(actions.createSiteFailed(error)));
  t.true(gen.next().done);
});

test('deleteSiteSaga succeed', t => {
  const siteId = '1234';
  const action = { _id: siteId };
  const gen = deleteSiteSaga(action);
  t.deepEqual(gen.next().value, deps.sagaHelpers.waitForConnectionEstablished());
  t.deepEqual(gen.next().value, put(actions.deleteSiteStatusChanged(DELETING_SITE)));
  t.deepEqual(gen.next().value, call(libs.deleteSite, action));
  t.deepEqual(gen.next().value, put(actions.deleteSiteSucceed(siteId)));
  t.true(gen.next().done);
});

test('deleteSiteSaga failed', t => {
  const action = { _id: '1234' };
  const error = {};
  const gen = deleteSiteSaga(action);
  t.deepEqual(gen.next().value, deps.sagaHelpers.waitForConnectionEstablished());
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
  const newSiteStatus = { _id: siteId, status: { type: 'ok' } };
  const gen = checkSiteSaga();

  t.deepEqual(gen.next().value, deps.sagaHelpers.waitForReadySubscription('sites', selectors.getIsReadySites));
  t.deepEqual(gen.next().value, select(selectors.getSelectedSite));
  t.deepEqual(gen.next(site).value,
    race({ res: call(requestFunc, url), timeout: call(delay, 30000) })
  );
  t.deepEqual(gen.next({ res, undefined }).value, put(actions.checkSiteSucceed(siteId)));
  t.deepEqual(gen.next().value, call(libs.updateSiteStatus, newSiteStatus));
  t.true(gen.next().done);
});

test('checkSiteSaga failed: superagent throws an error', t => {
  const siteId = '1234';
  const url = '';
  const site = { url, id: siteId };
  const error = new Error('');
  const newSiteStatus = { _id: siteId, status: { type: 'conflict', description: stringifyError(error) } };
  const gen = checkSiteSaga();

  t.deepEqual(gen.next().value, deps.sagaHelpers.waitForReadySubscription('sites', selectors.getIsReadySites));
  t.deepEqual(gen.next().value, select(selectors.getSelectedSite));
  t.deepEqual(gen.next(site).value,
    race({ res: call(requestFunc, url), timeout: call(delay, 30000) })
  );
  t.deepEqual(gen.throw(error).value, put(actions.checkSiteFailed(error)));
  t.deepEqual(gen.next().value, call(libs.updateSiteStatus, newSiteStatus));
  t.true(gen.next().done);
});

test("checkSiteSaga failed: Site server doesn't respond 200", t => {
  const siteId = '1234';
  const url = 'http://www.example.net/';
  const site = { url, id: siteId };
  const res = { status: 404 };
  const error = errors.RESPONSE_NOT_200;
  // const newSiteStatus = { _id: siteId, status: { type: 'conflict', description: error } };
  const gen = checkSiteSaga();

  t.deepEqual(gen.next().value, deps.sagaHelpers.waitForReadySubscription('sites', selectors.getIsReadySites));
  t.deepEqual(gen.next().value, select(selectors.getSelectedSite));
  t.deepEqual(gen.next(site).value,
    race({ res: call(requestFunc, url), timeout: call(delay, 30000) })
  );
  t.deepEqual(gen.next({ res, undefined }).value, call(checkSiteFailedSaga, siteId, error));
  // t.deepEqual(gen.next().value, put(actions.checkSiteFailed(error)));
  // t.deepEqual(gen.next().value, call(libs.updateSiteStatus, newSiteStatus));
  t.true(gen.next().done);
});

test("checkSiteSaga failed: Site hasn't WP API installed", t => {
  const siteId = '1234';
  const url = 'http://www.example.net/';
  const site = { url, id: siteId };
  const res = { status: 200, type: 'text/html' };
  const error = errors.WP_API_NOT_FOUND;
  // const newSiteStatus = { _id: siteId, status: { type: 'conflict', description: error } };
  const gen = checkSiteSaga();

  t.deepEqual(gen.next().value, deps.sagaHelpers.waitForReadySubscription('sites', selectors.getIsReadySites));
  t.deepEqual(gen.next().value, select(selectors.getSelectedSite));
  t.deepEqual(gen.next(site).value,
    race({ res: call(requestFunc, url), timeout: call(delay, 30000) })
  );
  t.deepEqual(gen.next({ res, undefined }).value, call(checkSiteFailedSaga, siteId, error));
  // t.deepEqual(gen.next({ res, undefined }).value, put(actions.checkSiteFailed(error)));
  // t.deepEqual(gen.next().value, call(libs.updateSiteStatus, newSiteStatus));
  t.true(gen.next().done);
});

test("checkSiteSaga failed: Site hasn't Worona WP plugin installed", t => {
  const siteId = '1234';
  const url = 'http://www.example.net/';
  const site = { url, id: siteId };
  const error = { status: 404, response: { body: { code: 'rest_no_route' } } };
  // const newSiteStatus = { _id: siteId, status: { type: 'conflict', description: noPluginError }};
  const gen = checkSiteSaga();

  t.deepEqual(gen.next().value, deps.sagaHelpers.waitForReadySubscription('sites', selectors.getIsReadySites));
  t.deepEqual(gen.next().value, select(selectors.getSelectedSite));
  t.deepEqual(gen.next(site).value,
    race({ res: call(requestFunc, url), timeout: call(delay, 30000) })
  );
  t.deepEqual(gen.throw(error).value,
    call(checkSiteFailedSaga, siteId, errors.WORONA_PLUGIN_NOT_FOUND));
  t.true(gen.next().done);
});


test("checkSiteSaga warning: Site Ids don't match", t => {
  const id = '1234';
  const url = 'http://www.example.net/';
  const site = { url, id };
  const res = { status: 200, type: 'application/json', body: { siteId: '4321' } };
  const newSiteStatus = { _id: id, status: { type: 'ok', description: errors.SITEID_DONT_MATCH } };
  const gen = checkSiteSaga();

  t.deepEqual(gen.next().value, deps.sagaHelpers.waitForReadySubscription('sites', selectors.getIsReadySites));
  t.deepEqual(gen.next().value, select(selectors.getSelectedSite));
  t.deepEqual(gen.next(site).value,
    race({ res: call(requestFunc, url), timeout: call(delay, 30000) })
  );
  t.deepEqual(gen.next({ res, undefined }).value,
             put(actions.checkSiteSucceed(id, errors.SITEID_DONT_MATCH)));
  t.deepEqual(gen.next().value, call(libs.updateSiteStatus, newSiteStatus));
  t.true(gen.next().done);
});
