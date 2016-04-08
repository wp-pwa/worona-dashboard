import { createClass } from 'asteroid';
import WebSocket from 'ws';

const Asteroid = createClass();

// Connect to a Meteor backend
export const connection = new Asteroid({
  endpoint: 'ws://localhost:3000/websocket',
  SocketConstructor: WebSocket,
});

// Logs the user in using username/email and password.
// Does not hash the password before sending it to the server. This should
// not be a problem, since you'll probably be using SSL anyway.
// Returns a promise which resolves to the userId of the logged in user when
// the login succeeds, or rejects when it fails.
export const login = ({ username, email, password, onSuccess, onError }) => {
  connection.loginWithPassword({ username, email, password })
    .then(onSuccess).catch(onError);
};

export const logout = ({ onSuccess, onError }) => {
  connection.logout().then(onSuccess).catch(onError);
};
