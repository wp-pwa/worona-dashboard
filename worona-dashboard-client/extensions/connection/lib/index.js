import { createClass } from 'asteroid';
import DDPClient from 'ddp-client';

export const connected = () => new Promise((resolve, reject) => reject());

const Asteroid = createClass();

export default class Connection {
  constructor(url) {
    this.url = url || 'ws://localhost:3000/websocket';
    this.asteroid = null;
  }

  start() {
    console.log('starting ddp...');
    this.ddpclient = new DDPClient({
      autoReconnect: false,
      maintainCollections: true,
      ddpVersion: '1',  // ['1', 'pre2', 'pre1'] available
      url: this.url,
    });
    // this.asteroid = new Asteroid({
    //   endpoint: this.url,
    //   autoConnect: false,
    //   autoReconnect: false,
    // });
  }

  connect() {
    this.ddpclient.connect();
  }

  connected() {
    return new Promise((resolve, reject) => reject());
  }

  disconnect() {
    this.asteroid.ddp.disconnect();
  }

  disconnected() {
    return new Promise((resolve) => {
      this.asteroid.once('disconnect', resolve);
    });
  }

  // Returns a promise which resolves to the userId of the logged in user when the login succeeds,
  // or rejects when it fails.
  login(email, password) {
    return this.asteroid.loginWithPassword({ email, password });
  }

  // Returns a promise which resolves to null when the logout succeeds, or rejects when it fails.
  logout() {
    return this.asteroid.logout();
  }

  // Returns a promise which resolves to the userId of the logged in user when the login succeeds,
  // or rejects when it fails.
  createAccount(email, password) {
    return this.asteroid.call('createAccount', email, password);
  }
}
