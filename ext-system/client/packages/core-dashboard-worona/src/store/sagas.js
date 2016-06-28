import { fork } from 'redux-saga/effects';
import build from '../build-dashboard-extension-worona/sagas';

export default function* rootSaga() {
  yield [
    fork(build),
  ];
}
