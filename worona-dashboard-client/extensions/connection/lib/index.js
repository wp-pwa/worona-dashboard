import { createClass } from 'asteroid';

const Asteroid = createClass();

export const connection = new Asteroid({
  endpoint: 'ws://localhost:3000/websocket',
});

export const login = (email, password) =>
  connection.loginWithPassword({ email, password });

export const logout = () =>
  connection.logout();

export const createAccount = (name, email, password) =>
  connection.call('createAccount', email, password);
