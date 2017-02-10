import { takeLatest, takeEvery, delay } from 'redux-saga';
import { call, put, select, fork, race } from 'redux-saga/effects';
import request from 'superagent';
import stringifyError from 'stringify-error-message';

import * as actions from '../actions';
import * as types from '../types';
import * as errors from '../errors';
import * as selectors from '../selectors';
import * as deps from '../deps';
import * as libs from '../libs';
import * as sagaHelpers from '../sagaHelpers';

export const CORSAnywhere = 'https://cors.worona.io/';
export const woronaEndPoint = '/worona/v1/siteid';
export const restRouteQuery = '?rest_route=';

export const checkWorona = baseUrl =>
  request
    .get(
      (/localhost/.test(baseUrl) ? '' : CORSAnywhere) + baseUrl + restRouteQuery + woronaEndPoint,
    )
    .set('Accept', 'application/json');

export const checkOnline = baseUrl =>
  request.head((/localhost/.test(baseUrl) ? '' : CORSAnywhere) + baseUrl);

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

  try {
    const { timeout } = yield race({ res: call(checkOnline, url), timeout: delay(30000) });
    if (timeout) {
      yield call(checkSiteFailedSaga, id, errors.TIMEOUT);
      return;
    }
  } catch (error) {
    yield call(checkSiteFailedSaga, id, errors.SITE_NOT_ONLINE);
    return;
  }

  try {
    const { res, timeout } = yield race({ res: call(checkWorona, url), timeout: delay(30000) });
    if (timeout) {
      yield call(checkSiteFailedSaga, id, errors.TIMEOUT);
      return;
    } else if (res.body === null || typeof res.body !== 'object') {
      throw new Error('The response is not a json');
    }
  } catch (error) {
    yield call(checkSiteFailedSaga, id, errors.WORONA_PLUGIN_NOT_FOUND);
    return;
  }

  yield put(actions.checkSiteSucceed(id));
  yield call(libs.updateSiteStatus, { siteId: id, status: { type: 'ok' } });
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
