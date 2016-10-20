import { takeLatest, delay } from 'redux-saga';
import { call, put, select, fork, race } from 'redux-saga/effects';
import request from 'superagent';
import stringifyError from 'stringify-error-message';

import * as actions from '../actions';
import * as types from '../types';
import * as errors from '../errors';
import * as selectors from '../selectors';
import * as deps from '../deps';
import * as libs from '../libs';

export const CORSAnywhere = 'https://cors-anywhere.herokuapp.com/';
export const woronaEndPoint = '/worona/v1/siteid';
export const restRouteQuery = '?rest_route=';

export const requestFunc = (baseURL) => request
  .get(CORSAnywhere + baseURL + restRouteQuery + woronaEndPoint)
  .set('Accept', 'application/json');

export function* checkSiteSaga() {
  let woronaSiteId;

  /* block until sites subscription is ready */
  yield deps.sagaHelpers.waitForReadySubscription('sites', selectors.getIsReadySites);

  const site = yield select(selectors.getSelectedSite);
  const { url, id } = site;

  try {
    const { res, timeout } = yield race({
      /* calling directly to the worona endpoint thank to rest_route query */
      res: call(requestFunc, url),
      /* Adding a timeout in case of user loses or has a very poor connection */
      timeout: call(delay, 30000), // 30 seg timeout
    });

    if (timeout) throw new Error(errors.TIMEOUT);

    /* Bad response */
    if (res.status !== 200) {
      throw new Error(errors.RESPONSE_NOT_200);
    }

    /* is response a JSON? */
    if (res.type !== 'application/json') {
      throw new Error(errors.WP_API_NOT_FOUND);
    }

    /* Does siteIds match? */
    woronaSiteId = res.body.siteId;
    if (woronaSiteId !== id) {
      throw new Error(errors.SITEID_DONT_MATCH);
    }

    yield put(actions.checkSiteSucceed());
    yield call(libs.updateSiteStatus, { _id: id, status: { type: 'ok' } });
  } catch (error) {
    /* It responses 404 but in WP API JSON format */
    if (error.status === 404 && error.response.body && error.response.body.code === 'rest_no_route') {
      const noPluginError = new Error(errors.WORONA_PLUGIN_NOT_FOUND);
      yield put(actions.checkSiteFailed(noPluginError));
      yield call(libs.updateSiteStatus, { _id: id, status: { type: 'conflict', description: noPluginError.message } });
    /* else, there's a server error */
    } else {
      yield put(actions.checkSiteFailed(error));
      yield call(libs.updateSiteStatus, { _id: id, status: { type: 'conflict', description: stringifyError(error) } });
    }
  }
}

export function* checkSiteRouterWatcher(action) {
  if (action && action.payload && action.payload.location
    && action.payload.location.pathname.startsWith('/check-site/')) {
    yield put(actions.checkSiteRequested());
  }
}

export function* firstRouteIsCheckSite() {
  /* block until sites subscription is ready */
  yield deps.sagaHelpers.waitForReadySubscription('sites', selectors.getIsReadySites);
  const pathname = yield select(deps.selectors.getPathname);
  if (pathname.startsWith('/check-site/')) yield put(actions.checkSiteRequested());
}

export function* checkSiteWatcher() {
  yield [
    takeLatest(deps.types.ROUTER_DID_CHANGE, checkSiteRouterWatcher),
    takeLatest(types.CHECK_SITE_REQUESTED, checkSiteSaga),
    fork(firstRouteIsCheckSite),
  ];
}
