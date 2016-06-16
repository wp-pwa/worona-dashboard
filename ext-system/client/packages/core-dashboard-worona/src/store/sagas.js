import { fork } from 'redux-saga/effects';
import build from '../build/sagas';

export default function* rootSaga() {
  yield [
    fork(build),
  ];
}
