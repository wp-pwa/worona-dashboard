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

export const CORSAnywhere = 'https://cors-anywhere.herokuapp.com/';
export const woronaEndPoint = '/worona/v1/siteid';
export const restRouteQuery = '?rest_route=';

export const requestFunc = baseURL =>
  request
    .get(CORSAnywhere + baseURL + restRouteQuery + woronaEndPoint)
    .set('Accept', 'application/json');

export function* checkSiteFailedSaga(_id, errorMsg) {
  yield put(actions.checkSiteFailed(errorMsg));
  yield call(libs.updateSiteStatus, { _id, status: { type: 'conflict', description: errorMsg } });
}

export function* checkSiteSaga() {
  let woronaSiteId;

  /* block until sites subscription is ready */
  yield sagaHelpers.waitForReadySelectedSite();

  const site = yield select(selectors.getSelectedSite);
  const { url, id } = site;
  let res;
  let timeout;
  try {
    ({ res, timeout } = yield race({
      /* calling directly to the worona endpoint thank to rest_route query */
      res: call(requestFunc, url),
      /* Adding a timeout in case of user loses or has a very poor connection */
      // 30 seg timeout
      timeout: call(delay, 30000),
    }));
  } catch (error) {
    /* It responses 404 but in WP API JSON format */
    if (
      error.status === 404 && error.response.body && error.response.body.code === 'rest_no_route'
    ) {
      yield call(checkSiteFailedSaga, id, errors.WORONA_PLUGIN_NOT_FOUND);
      /* else, there's a server error */
    } else {
      yield put(actions.checkSiteFailed(error));
      yield call(libs.updateSiteStatus, {
        _id: id,
        status: { type: 'conflict', description: stringifyError(error) },
      });
    }
    return;
  }
  if (timeout) {
    yield call(checkSiteFailedSaga, id, errors.TIMEOUT);
  } else if (res.status !== 200) {
    /* Bad response */
    yield call(checkSiteFailedSaga, id, errors.RESPONSE_NOT_200);
  } else if (res.type !== 'application/json') {
    /* is response a JSON? */
    yield call(checkSiteFailedSaga, id, errors.WP_API_NOT_FOUND);
  } else {
    /* Check site suceed!!! */
    /*  -> extra: Does siteIds match? */
    woronaSiteId = res.body.siteId;
    if (woronaSiteId !== id) {
      yield put(actions.checkSiteSucceed(id, errors.SITEID_DONT_MATCH));
      yield call(libs.updateSiteStatus, {
        _id: id,
        status: { type: 'ok', description: errors.SITEID_DONT_MATCH },
      });
    } else {
      yield put(actions.checkSiteSucceed(id));
      yield call(libs.updateSiteStatus, { _id: id, status: { type: 'ok' } });
    }
  }
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

export function* redirectAfterCheckSiteWatcher(action) {
  const { siteId } = action;
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
