/* eslint-disable class-methods-use-this */
import Connection from 'worona-asteroid';
import { endpoint } from '../config';

const connection = new Connection({ endpoint });

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
