import { fork } from 'redux-saga/effects';

function* logSaga() {
  console.log('test saga running!');
}

export default function* testSagas() {
  yield [
    fork(logSaga),
  ];
}
