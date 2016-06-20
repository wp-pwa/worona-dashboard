import worona from 'worona';

module.exports = {
  get call() { return worona.connection.libs.call; },
  get loginWithPassword() { return worona.connection.libs.loginWithPassword; },
  get loggedInEventChannel() { return worona.connection.libs.loggedInEventChannel; },
  get loggedOutEventChannel() { return worona.connection.libs.loggedOutEventChannel; },
  get logout() { return worona.connection.libs.logout; },
  get CONNECTION_SUCCEED() { return worona.connection.actiontypes.CONNECTION_SUCCEED; },
  get isConnected() { return worona.connection.selectors.isConnected; },
  get browserHistory() { return worona.router.browserHistory; },
};
