/* eslint-disable class-methods-use-this */
import { createClass } from 'asteroid';
import { eventChannel } from 'redux-saga';
import { url } from '../config';

const Asteroid = createClass();

export class Connection {
  constructor(options = {}) {
    this.url = options.url || url;
    this.client = null;
  }

  start() {
    this.client = new Asteroid({
      autoConnect: false,
      autoReconnect: false,
      maintainCollections: true,
      ddpVersion: '1',
      endpoint: this.url,
    });
  }

  connect() {
    this.client.ddp.connect();
  }

  connectedEventChannel() {
    return eventChannel(listener => {
      const connected = this.client.ddp.on('connected', () => {
        listener('connected');
      });
      return () => {
        this.client.ddp.removeListener('connected', connected);
      };
    });
  }

  disconnectedEventChannel() {
    return eventChannel(listener => {
      const disconnected = this.client.ddp.on('disconnected', () => {
        listener('disconnected');
      });
      return () => {
        this.client.ddp.removeListener('disconnected', disconnected);
      };
    });
  }

  call(...params) {
    return new Promise((resolve, reject) => {
      this.client.call(...params)
      .then(result => {
        if (typeof result === 'object' && result.errorType === 'Meteor.Error') {
          reject(result);
        } else {
          resolve(result);
        }
      })
      .catch(error => reject(error));
    });
  }

  loginWithPassword(email, password) {
    return this.client.loginWithPassword({ email, password });
  }

  loggedInEventChannel() {
    return eventChannel(listener => {
      const loggedIn = this.client.on('loggedIn', () => {
        listener(this.client.userId);
      });
      return () => {
        this.client.removeListener('loggedIn', loggedIn);
      };
    });
  }

  loggedOutEventChannel() {
    return eventChannel(listener => {
      const loggedOut = this.client.on('loggedOut', () => {
        listener('logout');
      });
      return () => {
        this.client.removeListener('loggedOut', loggedOut);
      };
    });
  }

  logout() {
    return this.client.logout();
  }

  subscribe(...params) {
    return this.client.subscribe(...params);
  }

  unsubscribe(id) {
    this.client.unsubscribe(id);
  }

  collectionEventChannel(selectedCollection, subscription) {
    return eventChannel(listener => {
      const added = this.client.ddp.on('added', ({ collection, id, fields }) => {
        console.log(collection);
        if (collection === selectedCollection) {
          listener({ collection: subscription.name, event: 'added', id, fields });
        }
      });
      const changed = this.client.ddp.on('changed', ({ collection, id, fields }) => {
        console.log(collection);
        if (collection === selectedCollection) {
          listener({ collection: subscription.name, event: 'changed', id, fields });
        }
      });
      const removed = this.client.ddp.on('removed', ({ collection, id, fields }) => {
        if (collection === selectedCollection) {
          listener({ collection: subscription.name, event: 'removed', id, fields });
        }
      });
      return () => {
        this.client.ddp.removeListener('added', added);
        this.client.ddp.removeListener('changed', changed);
        this.client.ddp.removeListener('removed', removed);
      };
    });
  }

  readyEventChannel(subscription) {
    return eventChannel(listener => {
      const ready = subscription.on('ready', () => {
        listener(subscription.name);
      });
      return () => {
        subscription.removeListener('ready', ready);
      };
    });
  }

  errorEventChannel(subscription) {
    return eventChannel(listener => {
      const error = subscription.on('error', err => {
        listener(subscription.name, err);
      });
      return () => {
        subscription.removeListener('error', error);
      };
    });
  }
}

const connection = new Connection();
export const start = connection.start.bind(connection);
export const connect = connection.connect.bind(connection);
export const connectedEventChannel = connection.connectedEventChannel.bind(connection);
export const disconnectedEventChannel = connection.disconnectedEventChannel.bind(connection);
export const call = connection.call.bind(connection);
export const loginWithPassword = connection.loginWithPassword.bind(connection);
export const loggedInEventChannel = connection.loggedInEventChannel.bind(connection);
export const loggedOutEventChannel = connection.loggedOutEventChannel.bind(connection);
export const logout = connection.logout.bind(connection);
export const subscribe = connection.subscribe.bind(connection);
export const unsubscribe = connection.unsubscribe.bind(connection);
export const collectionEventChannel = connection.collectionEventChannel.bind(connection);
export const readyEventChannel = connection.readyEventChannel.bind(connection);
export const errorEventChannel = connection.errorEventChannel.bind(connection);
export default connection;
