import { takeLatest, takeEvery, delay } from 'redux-saga';
import { call, put, select, fork, race } from 'redux-saga/effects';
import superagent from 'superagent';
import * as actions from '../actions';
import * as types from '../types';
import * as errors from '../errors';
import * as selectors from '../selectors';
import * as deps from '../deps';
import * as libs from '../libs';
import * as sagaHelpers from '../sagaHelpers';

const proxies = {
  cors: 'https://cors.worona.io/',
  proxy: 'https://proxy.worona.io/',
};

const endpoints = {
  home: '',
  plugin: '?rest_route=/',
};

const libraries = {
  superagent,
};

const getPath = ({ url, endpoint, proxy }) =>
  (/localhost/.test(url)
    ? `${url}${endpoints[endpoint]}`
    : `${proxies[proxy]}${url}${endpoints[endpoint]}`);

const check = ({ url, proxy, endpoint, library }) =>
  libraries[library](getPath({ url, proxy, endpoint }));

export function* checkSiteFailedSaga(siteId, errorMsg) {
  yield put(actions.checkSiteFailed(errorMsg));
  yield call(libs.updateSiteStatus, {
    siteId,
    status: { type: 'conflict', description: errorMsg },
  });
}

function* runTests({ tests }) {
  for (const test of tests) {
    try {
      // Start the current test and race it against a timeout.
      const { result } = yield race({
        result: call(check, test),
        timeout: delay(30000),
      });
      // Fetch succeed, we don't need to do more tests.
      if (result) {
        return { result, status: 'succeed' };
      }
      return { status: 'timeout' };
    } catch (error) {
      // Fetch failed, keep going.
    }
  }
  return { status: 'failed' };
}

export function* checkSiteSaga() {
  // Block until sites subscription is ready.
  yield sagaHelpers.waitForReadySelectedSite();

  const { url, id } = yield select(selectors.getSelectedSite);

  const { status: homeStatus } = yield call(runTests, {
    tests: [
      { url, library: 'superagent', endpoint: 'home', proxy: 'proxy' },
      { url, library: 'superagent', endpoint: 'home', proxy: 'cors' },
    ],
  });

  if (homeStatus === 'timeout') return yield call(checkSiteFailedSaga, id, errors.TIMEOUT);
  else if (homeStatus === 'failed')
    return yield call(checkSiteFailedSaga, id, errors.SITE_NOT_ONLINE);

  const { result, status: pluginStatus } = yield call(runTests, {
    tests: [
      { url, library: 'superagent', endpoint: 'plugin', proxy: 'proxy' },
      { url, library: 'superagent', endpoint: 'plugin', proxy: 'cors' },
    ],
  });

  if (pluginStatus === 'timeout') return yield call(checkSiteFailedSaga, id, errors.TIMEOUT);
  else if (pluginStatus === 'failed')
    return yield call(checkSiteFailedSaga, id, errors.WORONA_PLUGIN_NOT_FOUND);
  else if (
    // Request ok but response is not a JSON.
    typeof result.body !== 'object' ||
    result.body === null ||
    // API endpoints ok but worona plugin not installed.
    (result.body && result.body.namespaces && result.body.namespaces.indexOf('worona/v1') === -1)
  ) {
    return yield call(checkSiteFailedSaga, id, errors.WORONA_PLUGIN_NOT_FOUND);
  } else if (
    // API endpoints ok but WP-API plugin not installed.
    result.body &&
    result.body.namespaces &&
    result.body.namespaces.indexOf('wp/v2') === -1
  ) {
    return yield call(checkSiteFailedSaga, id, errors.WP_API_NOT_FOUND);
  }

  yield put(actions.checkSiteSucceed(id));
  return yield call(libs.updateSiteStatus, {
    siteId: id,
    status: { type: 'ok' },
  });
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
  if (pathname.startsWith('/check-site/')) {
    yield put(actions.checkSiteRequested());
  }
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
