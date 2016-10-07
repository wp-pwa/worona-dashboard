import test from 'ava';
import deepFreeze from 'deep-freeze';
import { mock } from 'worona-deps';
import * as reducers from '../reducers';
import * as actions from '../actions';
import * as deps from '../dependencies';

mock(deps);

test('isCreatingSite', t => {
  t.false(reducers.isCreatingSite(undefined, {}));
  t.true(reducers.isCreatingSite(false, actions.createSiteRequested()));
  t.false(reducers.isCreatingSite(true, actions.createSiteFailed()));
  t.false(reducers.isCreatingSite(true, actions.createSiteSucceed()));
});

test('createSiteStatus', t => {
  const status = {};
  deepFreeze(status);
  t.false(reducers.createSiteStatus(undefined, {}));
  t.is(reducers.createSiteStatus(false, actions.createSiteStatusChanged(status)), status);
  t.false(reducers.createSiteStatus(status, actions.createSiteSucceed()));
  t.false(reducers.createSiteStatus(status, actions.createSiteFailed()));
});

test('createSiteError', t => {
  const msg = 'Some Sites Error';
  const error = new Error(msg);
  deepFreeze(error);
  t.false(reducers.createSiteError(undefined, {}));
  t.is(reducers.createSiteError(false, actions.createSiteFailed(error)), msg);
  t.false(reducers.createSiteError(error, actions.createSiteRequested()));
  t.false(reducers.createSiteError(error, actions.createSiteSucceed()));
});

test('newSiteInfo', t => {
  t.deepEqual(reducers.newSiteInfo(undefined, {}), {});
  t.deepEqual(reducers.newSiteInfo(undefined, actions.createSiteSucceed), {});

  const mockAction = { type: deps.types.ROUTER_DID_CHANGE };
  const noQuery = Object.assign({ type: deps.types.ROUTER_DID_CHANGE, payload: { location: { pathname: '/', query: {} } } }, mockAction);
  deepFreeze(noQuery);
  t.deepEqual(reducers.newSiteInfo(undefined, noQuery), {});
  const siteName = 'foo';
  const siteNameQuery = Object.assign({ type: deps.types.ROUTER_DID_CHANGE, payload: { location: { pathname: '/', query: { siteName } } } }, mockAction);
  deepFreeze(siteNameQuery);
  t.deepEqual(reducers.newSiteInfo(undefined, siteNameQuery), { siteName });
  const siteId = '123';
  const siteNameAndIdQuery = Object.assign({ type: deps.types.ROUTER_DID_CHANGE, payload: { location: { pathname: '/', query: { siteName, siteId } } } }, mockAction);
  deepFreeze(siteNameAndIdQuery);
  t.deepEqual(reducers.newSiteInfo(undefined, siteNameAndIdQuery), { siteName, siteId });
  const siteURL = 'https://foo.blog';
  const siteNameURLAndIdQuery = Object.assign({ type: deps.types.ROUTER_DID_CHANGE, payload: { location: { pathname: '/', query: { siteName, siteId, siteURL } } } }, mockAction);
  const newSiteInfoState = { siteName, siteId, siteURL };
  deepFreeze(newSiteInfoState);
  deepFreeze(siteNameURLAndIdQuery);
  t.deepEqual(reducers.newSiteInfo(undefined, siteNameURLAndIdQuery), newSiteInfoState);
});
