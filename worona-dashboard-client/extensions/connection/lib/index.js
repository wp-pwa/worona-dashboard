import { createClass } from 'asteroid';
import { store } from 'store';
import { connected, disconnected, loggedOut } from '../actions';

const Asteroid = createClass();

// Connect to a Meteor backend
export const connection = new Asteroid({
  endpoint: 'ws://localhost:3000/websocket',
  // SocketConstructor: ws,
});

window.connection = connection;

export const login = (email, password) =>
  connection.loginWithPassword({ email, password });

export const logout = () =>
  connection.logout();

export const createAccount = (name, email, password) =>
  connection.call('createAccount', email, password);

// Events
connection.on('connected', () => {
  store.dispatch(connected());
});

connection.on('disconnected', () => {
  store.dispatch(disconnected());
});

connection.on('loggedOut', () => {
  store.dispatch(loggedOut());
});
