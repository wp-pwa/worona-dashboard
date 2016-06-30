/* eslint-disable no-constant-condition */
import worona from 'worona';
import { take, put, call, fork } from 'redux-saga/effects';
import { combineReducers } from 'redux';
import { reloadReducersSucceed, reloadReducersFailed } from '../actions';
import { RELOAD_REDUCERS_REQUESTED } from '../actiontypes';
import store from '../';
import build from '../../build-dashboard-extension-worona/sagas';

export function* reloadReducers() {
  while (true) {
    const action = yield take(RELOAD_REDUCERS_REQUESTED);
    try {
      worona.reducers[action.name] = worona[action.name].reducers.default;
      yield call(store.replaceReducer, combineReducers(worona.reducers));
      yield put(reloadReducersSucceed(action.name));
    } catch (error) {
      yield put(reloadReducersFailed(action.name));
    }
  }
}

export default function* saga() {
  yield [
    fork(reloadReducers),
    fork(build),
  ];
}
