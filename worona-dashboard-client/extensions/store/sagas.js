import 'babel-polyfill';
import accounts from 'accounts/sagas';
import connection from 'connection/sagas';

export default []
  .concat(accounts)
  .concat(connection);
