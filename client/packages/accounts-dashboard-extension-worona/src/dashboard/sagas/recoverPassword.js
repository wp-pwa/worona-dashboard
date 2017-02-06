import { takeLatest } from 'redux-saga';
import { call, put, select, take } from 'redux-saga/effects';
import * as actions from '../actions';
import * as types from '../types';
import * as deps from '../deps';

export function* recoverPasswordSaga({ token, password }) {
  if (yield select(deps.selectors.getIsConnected)) {
    try {
      yield call(deps.libs.call, 'resetPassword', token, password);
      yield put(actions.recoverPasswordSucceed());
    } catch (error) {
      yield put(actions.recoverPasswordFailed({ error }));
    }
  } else {
    yield take(deps.types.CONNECTION_SUCCEED);
    yield call(recoverPasswordSaga, { token, password });
  }
}

export default function* recoverPasswordSagas() {
  yield [
    takeLatest(types.RECOVER_PASSWORD_REQUESTED, recoverPasswordSaga),
  ];
}
