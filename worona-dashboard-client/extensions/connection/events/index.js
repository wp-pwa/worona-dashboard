import { connection } from '../lib';
import { store } from 'store';
import { connected, disconnected, loggedOut } from '../actions';

connection.on('connected', () => {
  store.dispatch(connected());
});

connection.on('disconnected', () => {
  store.dispatch(disconnected());
});

connection.on('loggedOut', () => {
  store.dispatch(loggedOut());
});
