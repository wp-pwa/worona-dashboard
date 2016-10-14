import { takeLatest } from 'redux-saga';
import { call, put, select, fork } from 'redux-saga/effects';
import request from 'superagent';

import * as actions from '../actions';
import * as types from '../types';
import * as errors from '../errors';
import * as selectors from '../selectors';
import * as deps from '../dependencies';


export const woronaEndPoint = '/worona/v1/siteid';
export const restRouteQuery = '?rest_route=';

export const requestFunc = (baseURL) => request
  .get(baseURL + restRouteQuery + woronaEndPoint)
  .set('Accept', 'application/json');

export function* checkSiteSaga() {
  let woronaSiteId;

  /* block until sites subscription is ready */
  yield deps.sagaCreators.waitForReadySubscription('sites', selectors.getIsReadySites);

  const site = yield select(selectors.getSelectedSite);
  const { url, id } = site;

  try {
    /* calling directly to the worona endpoint thank to rest_route query */
    const res = yield call(requestFunc, url);

    /* It responses 404 but in WP JSON format */
    if (res.status === 404 && res.type === 'application/json') {
      throw new Error(errors.WORONA_PLUGIN_NOT_FOUND);
    }

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
  } catch (error) {
    yield put(actions.checkSiteFailed(error));
  }
}

export function* checkSiteRouterWatcher(action) {
  console.log('goo');
  if (action && action.payload && action.payload.location
    && action.payload.location.pathname.startsWith('/check-site/')) {
    yield put(actions.checkSiteRequested());
  }
}

export function* firstRouteIsCheckSite() {
  yield deps.sagaCreators.waitForReadySubscription('sites', selectors.getIsReadySites);
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
