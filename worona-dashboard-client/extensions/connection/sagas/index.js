import { put } from 'redux-saga';
import { connection } from '../lib';
import { connected, disconnected, loggedOut } from '../actions';

export default function* sagas() {
  // Events
  connection.on('connected', () => {
    put(connected());
  });

  connection.on('disconnected', () => {
    put(disconnected());
  });

  connection.on('loggedOut', () => {
    put(loggedOut());
  });
}
