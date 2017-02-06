import { takeLatest } from 'redux-saga';
import { call, put, select, take } from 'redux-saga/effects';
import * as actions from '../actions';
import * as types from '../types';
import * as deps from '../deps';

export function* forgotPasswordSaga({ email }) {
  if (yield select(deps.selectors.getIsConnected)) {
    try {
      yield call(deps.libs.call, 'forgotPasswordByEmail', { email });
      yield put(actions.forgotPasswordSucceed());
    } catch (error) {
      yield put(actions.forgotPasswordFailed({ error }));
    }
  } else {
    yield take(deps.types.CONNECTION_SUCCEED);
    yield call(forgotPasswordSaga, { email });
  }
}

export default function* forgotPasswordSagas() {
  yield [
    takeLatest(types.FORGOT_PASSWORD_REQUESTED, forgotPasswordSaga),
  ];
}
