import { fork } from 'redux-saga/effects';
import * as deps from '../dependencies';
import { getCategories } from './getCategories';

export default function* settingsagas() {
  yield [
    fork(getCategories),
    fork(deps.sagaCreators.subscriptionWatcherCreator('settings')),
  ];
}
