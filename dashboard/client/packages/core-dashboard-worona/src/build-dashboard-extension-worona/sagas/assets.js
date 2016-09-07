/* eslint-disable no-constant-condition */
import { takeEvery } from 'redux-saga';
import { put, take, select } from 'redux-saga/effects';
import { reduce } from 'lodash';
import * as types from '../types';
import * as actions from '../actions';
import * as selectors from '../selectors';

export const assetsLoadSaga = type =>
  function* typedAssetsLoadSaga({ pkg }) {
    while (true) {
      yield take(types.PACKAGE_ASSET_FILE_DOWNLOADED);
      const assets = yield select(selectors.getAssets);
      const assetType = assets[pkg.name][type];
      if (reduce(assetType, (acc, val) => acc && val, true)) {
        yield put(actions.packageAssetsLoadSucceed({ pkg }));
        break;
      }
    }
  };

export default function* sagas() {
  yield [
    takeEvery(types.PACKAGE_ASSETS_LOAD_REQUESTED, assetsLoadSaga('css')),
  ];
}
