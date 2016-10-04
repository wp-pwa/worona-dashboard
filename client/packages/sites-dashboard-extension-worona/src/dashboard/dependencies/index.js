import { dep } from 'worona-deps';

export const libs = {
  get call() { return dep('connection', 'libs', 'call'); },
  get subscription() { return dep('subscriptions', 'libs', 'subscription'); },
};

export const reducerCreators = {
  get collectionCreator() { return dep('subscriptions', 'reducerCreators', 'collectionCreator'); },
  get isReadyCreator() { return dep('subscriptions', 'reducerCreators', 'isReadyCreator'); },
};

export const sagaCreators = {
  get subscriptionWatcherCreator() {
    return dep('subscriptions', 'sagaCreators', 'subscriptionWatcherCreator');
  },
};

export const selectors = {
  get getSelectedSiteId() { return dep('router', 'selectors', 'getSelectedSiteId'); },
};

export const actions = {
  get push() {
    return dep('router', 'actions', 'push');
  },
};

export const types = {
  get ROUTER_DID_CHANGE() { return dep('router', 'types', 'ROUTER_DID_CHANGE'); },
};
