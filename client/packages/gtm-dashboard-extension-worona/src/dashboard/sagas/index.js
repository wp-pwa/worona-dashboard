import { takeEvery } from 'redux-saga';

export function* launchGTMEventsSaga(action) {
  const { type, ...props } = action;
  window.dataLayer.push({
    event: type,
    props,
  });
}

export function initDataLayerArray() {
  window.dataLayer = window.dataLayer || [];
}

export default function* gtmSagas() {
  initDataLayerArray();
  yield [
    takeEvery('*', launchGTMEventsSaga),
  ];
}
