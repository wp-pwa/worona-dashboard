import { createClass } from 'asteroid';
import { eventChannel } from 'redux-saga';

const Asteroid = createClass();

export class Connection {
  constructor(url) {
    this.url = url || 'ws://localhost:3000/websocket';
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
}

export default new Connection();
