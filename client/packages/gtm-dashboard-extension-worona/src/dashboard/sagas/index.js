/* eslint-disable no-undef */
import { takeEvery } from 'redux-saga';
import { select, fork } from 'redux-saga/effects';
import { capitalize } from 'lodash';
import * as deps from '../deps';

export function launchGtmEventsSaga({ type, ...props }) {
  window.dataLayer.push({
    event: type,
    props,
  });
}

export function* virtualPageView() {
  const service = yield select(deps.selectors.getSelectedService);
  const pkg = yield select(deps.selectors.getSelectedPackageName);
  const pathname = yield select(deps.selectors.getPathname);
  const titleFromUrl = capitalize(/\/?([^/]+)/.exec(pathname)[1]).replace(/-/g, ' ');
  const titleFromPkg = pkg ? capitalize(/(.+)-worona/.exec(pkg)[1].replace(/-/g, ' ')) : '';
  const title = !service ? titleFromUrl : titleFromPkg;
  const url = pathname.replace(/(\/?.+)(\/[a-zA-Z0-9]{17})/, '$1');
  window.dataLayer.push({
    event: 'virtualPageView',
    virtualPage: {
      title,
      url,
    },
  });
}

export default function* gtmSagas() {
  window.dataLayer = window.dataLayer || [];
  yield [
    takeEvery('*', launchGtmEventsSaga),
    takeEvery(deps.types.ROUTER_DID_CHANGE, virtualPageView),
    fork(virtualPageView),
  ];
}
