import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import request from 'superagent';

import * as actions from '../actions';
import * as types from '../types';
import * as errors from '../errors';
import * as deps from '../dependencies';


export const woronaEndPoint = 'worona/v1/siteid';
export const restRouteQuery = '?rest_route=';

export const requestFunc = (baseURL) => request
  .get(baseURL + restRouteQuery + woronaEndPoint)
  .set('Accept', 'application/json');

export function* checkSiteSaga(action) {
  let woronaSiteId;

  const { url, _id } = action;
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
    if (woronaSiteId !== _id) {
      throw new Error(errors.SITEID_DONT_MATCH);
    }

    yield put(actions.checkSiteSucceed());
  } catch (error) {
    yield put(actions.checkSiteFailed(error));
  }
}

export function* checkSiteRouterWatcher(action) {
  console.log(action);
  if (action && action.payload && action.payload.location) {
    console.log("foo");
    yield put(actions.checkSiteRequested());
  }
}

export function* checkSiteWatcher() {
  console.log(deps.types.ROUTER_DID_CHANGE);
  yield [
    takeLatest(deps.types.ROUTER_DID_CHANGE, checkSiteRouterWatcher),
    takeLatest(types.CHECK_SITE_REQUESTED, checkSiteSaga),
  ];
}
