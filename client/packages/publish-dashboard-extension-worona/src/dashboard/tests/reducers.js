import test from 'ava';
import deepFreeze from 'deep-freeze';
import { mock } from 'worona-deps';
import * as reducers from '../reducers';
import * as actions from '../actions';
import * as deps from '../deps';
import * as errors from '../errors';

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

test('checkSite', t => {
  const CheckSiteState = reducers.CheckSiteState;

  t.deepEqual(reducers.checkSite(undefined, {}), new CheckSiteState());

  const state = {};
  const requestAction = actions.checkSiteRequested('https://1234.com', '1234');
  deepFreeze(requestAction);
  t.deepEqual(reducers.checkSite(state, requestAction), new CheckSiteState('loading', 'loading', 'loading'));

  /* successful */
  const successfulAction = actions.checkSiteSucceed();
  deepFreeze(successfulAction);
  t.deepEqual(reducers.checkSite(state, successfulAction), new CheckSiteState('success', 'success', 'success'));

  /* Errors */

  /* site is down */
  const siteIsDownAction = actions.checkSiteFailed(new Error(errors.RESPONSE_NOT_200));
  deepFreeze(siteIsDownAction);
  t.deepEqual(reducers.checkSite(state, siteIsDownAction), new CheckSiteState('error'));

  /* API is not installed */
  const APINotInstalledAction = actions.checkSiteFailed(new Error(errors.WP_API_NOT_FOUND));
  deepFreeze(APINotInstalledAction);
  t.deepEqual(reducers.checkSite(state, APINotInstalledAction), new CheckSiteState('success', 'error'));

  /* Worona WordPress Plugin is not installed */
  const WWPPNotInstalledAction = actions.checkSiteFailed(new Error(errors.WORONA_PLUGIN_NOT_FOUND));
  deepFreeze(WWPPNotInstalledAction);
  t.deepEqual(reducers.checkSite(state, WWPPNotInstalledAction), new CheckSiteState('success', 'error'));

  /* Dashboard siteId doesn't match with WP siteId */
  const IdsDontMatchAction = actions.checkSiteSucceed('', errors.SITEID_DONT_MATCH);
  deepFreeze(IdsDontMatchAction);
  t.deepEqual(reducers.checkSite(state, IdsDontMatchAction), new CheckSiteState('success', 'success', 'warning'));
});
