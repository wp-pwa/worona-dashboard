import { dep } from 'worona-deps';

export const libs = {
  get call() { return dep('connection', 'libs', 'call'); },
  get loginWithPassword() { return dep('connection', 'libs', 'loginWithPassword'); },
  get loggedInEventChannel() { return dep('connection', 'libs', 'loggedInEventChannel'); },
  get loggedOutEventChannel() { return dep('connection', 'libs', 'loggedOutEventChannel'); },
  get logout() { return dep('connection', 'libs', 'logout'); },
  get push() { return dep('build', 'libs', 'push'); },
};

export const types = {
  get CONNECTION_SUCCEED() { return dep('connection', 'types', 'CONNECTION_SUCCEED'); },
};

export const selectors = {
  get isConnected() { return dep('connection', 'selectors', 'isConnected'); },
};
