import { takeLatest, takeEvery, delay } from 'redux-saga';
import { call, put, select, fork, race } from 'redux-saga/effects';
import request from 'superagent';
import * as actions from '../actions';
import * as types from '../types';
import * as errors from '../errors';
import * as selectors from '../selectors';
import * as deps from '../deps';
import * as libs from '../libs';
import * as sagaHelpers from '../sagaHelpers';

export const cors = 'https://backend.worona.io/api/v1/cors/';

export const checkOnline = baseUrl => request((/localhost/.test(baseUrl) ? '' : cors) + baseUrl);

export const checkWorona = baseUrl =>
  request(`${/localhost/.test(baseUrl) ? '' : cors}${baseUrl}?rest_route=/`);

export function* checkSiteFailedSaga(siteId, errorMsg) {
  yield put(actions.checkSiteFailed(errorMsg));
  yield call(libs.updateSiteStatus, {
    siteId,
    status: { type: 'conflict', description: errorMsg },
  });
}

export function* checkSiteSaga() {
  // Block until sites subscription is ready.
  yield sagaHelpers.waitForReadySelectedSite();

  const { url, id } = yield select(selectors.getSelectedSite);

  const { resOnline, timeoutOnline } = yield race({
    resOnline: call(checkOnline, url),
    timeoutOnline: delay(30000),
  });
  if (timeoutOnline) {
    return yield call(checkSiteFailedSaga, id, errors.TIMEOUT);
  } else if (resOnline.body && resOnline.body.error) {
    return yield call(checkSiteFailedSaga, id, errors.SITE_NOT_ONLINE);
  }

  const { resWorona, timeoutWorona } = yield race({
    resWorona: call(checkWorona, url),
    timeoutWorona: delay(30000),
  });
  if (timeoutWorona) {
    return yield call(checkSiteFailedSaga, id, errors.TIMEOUT);
  } else if (
    // Error in request.
    resWorona.body && resWorona.body.error ||
    // Request ok but response is not a JSON.
    typeof resWorona.body !== 'object' ||
    resWorona.body === null ||
    // API endpoints ok but worona plugin not installed.
    resWorona.body &&
      resWorona.body.namespaces &&
      resWorona.body.namespaces.indexOf('worona/v1') === -1
  ) {
    return yield call(checkSiteFailedSaga, id, errors.WORONA_PLUGIN_NOT_FOUND);
  } else if (
    // API endpoints ok but WP-API plugin not installed.
    resWorona.body && resWorona.body.namespaces && resWorona.body.namespaces.indexOf('wp/v2') === -1
  ) {
    return yield call(checkSiteFailedSaga, id, errors.WP_API_NOT_FOUND);
  }

  yield put(actions.checkSiteSucceed(id));
  return yield call(libs.updateSiteStatus, { siteId: id, status: { type: 'ok' } });
}

export function* checkSiteRouterWatcher(action) {
  if (
    action &&
    action.payload &&
    action.payload.location &&
    action.payload.location.pathname.startsWith('/check-site/')
  ) {
    yield put(actions.checkSiteRequested());
  }
}

export function* firstRouteIsCheckSite() {
  /* block until sites subscription is ready */
  yield deps.sagaHelpers.waitForReadySubscription('sites', selectors.getIsReadySites);
  const pathname = yield select(deps.selectors.getPathname);
  if (pathname.startsWith('/check-site/')) yield put(actions.checkSiteRequested());
}

export function* redirectAfterCheckSiteWatcher({ siteId }) {
  yield delay(1000);
  const redirect = (yield select(deps.selectorCreators.getUrlQuery('redirect'))) || '/app';
  yield call(deps.libs.push, `/site/${siteId}${redirect}`);
}

export function* checkSiteWatcher() {
  yield [
    takeLatest(deps.types.ROUTER_DID_CHANGE, checkSiteRouterWatcher),
    takeLatest(types.CHECK_SITE_REQUESTED, checkSiteSaga),
    takeEvery(types.CHECK_SITE_SUCCEED, redirectAfterCheckSiteWatcher),
    fork(firstRouteIsCheckSite),
  ];
}
