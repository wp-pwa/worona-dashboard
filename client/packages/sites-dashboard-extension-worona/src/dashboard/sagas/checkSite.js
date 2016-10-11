import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import request from 'superagent';

import { CHECKING_SITE_UP, CHECKING_WORDPRES_PLUGIN } from '../status';
import * as actions from '../actions';
import * as types from '../types';
import * as errors from '../errors';

export function* checkSiteSaga(action) {
  let res2;
  let res;
  let woronaSiteId;
  const { url, id } = action;
  try {
    yield put(actions.checkSiteStatusChanged(CHECKING_SITE_UP));

    /* discovering the API */
  // http://v2.wp-api.org/guide/discovery/
    res = yield call(request.head, url);

    if (res.status !== 200) {
      throw new Error(errors.HTTP_NOT_200 + '. HTTP response is: '+ res.status);
    }
  } catch (error) {
    yield put(actions.checkSiteFailed(CHECKING_SITE_UP, error));
    return;
  }

  yield put(actions.checkSiteSucceed(CHECKING_SITE_UP));

  try {
    yield put(actions.checkSiteStatusChanged(CHECKING_WORDPRES_PLUGIN));

    const baseURL = res.body.Link;
    if (!baseURL) throw new Error(errors.WP_API_NOT_FOUND);

    console.log(baseURL);

    /* calling to the worona endpoint */
    // baseURL (from previous step) + /wp-json/worona/v1/siteid
    // https://github.com/worona/worona-wp-plugin/issues/2
    const woronaEndPoint = 'worona/v1/siteid';
    res2 = yield call(
      request
      .get,
      // .set('Accept', 'application/json'),
      baseURL + woronaEndPoint);

    woronaSiteId = res2.body.siteId;
    if (!woronaSiteId) throw new Error(errors.SITEID_NOT_FOUND)
  } catch (error) {
    yield put(actions.checkSiteFailed(CHECKING_WORDPRES_PLUGIN, error));
    return;
  }

  yield put(actions.checkSiteSucceed(CHECKING_WORDPRES_PLUGIN, woronaSiteId));
  try {
    yield put(actions.checkSiteStatusChanged(CHECKING_SITE_ID));

    if (woronaSiteId !== id) throw new Error(errors.SITEID_DONT_MATCH);
  } catch (error) {
    yield put(actions.checkSiteFailed(CHECKING_SITE_ID, error));
    return;
  }

  yield put(actions.checkSiteStatusSuceed(CHECKING_SITE_ID));
}

export function* checkSiteWatcher() {
  yield* takeEvery(types.CHECK_SITE_REQUESTED, checkSiteSaga);
}
