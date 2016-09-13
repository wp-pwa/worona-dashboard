import { dep } from 'worona-deps';

export const libs = {
  get collectionEventChannel() { return dep('connection', 'libs', 'collectionEventChannel'); },
  get subscribe() { return dep('connection', 'libs', 'subscribe'); },
  get unsubscribe() { return dep('connection', 'libs', 'unsubscribe'); },
  get readyEventChannel() { return dep('connection', 'libs', 'readyEventChannel'); },
  get errorEventChannel() { return dep('connection', 'libs', 'errorEventChannel'); },
};

export const types = {
  get LOGIN_SUCCEED() { return dep('accounts', 'types', 'LOGIN_SUCCEED'); },
  get LOGOUT_SUCCEED() { return dep('accounts', 'types', 'LOGOUT_SUCCEED'); },
};
