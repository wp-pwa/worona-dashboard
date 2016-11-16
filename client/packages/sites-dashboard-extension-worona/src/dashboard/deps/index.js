import { dep } from 'worona-deps';

export const libs = {
  get call() { return dep('connection', 'libs', 'call'); },
  get subscription() { return dep('subscriptions', 'libs', 'subscription'); },
  get push() {
    return dep('router', 'libs', 'push');
  },
};

export const reducerCreators = {
  get collectionCreator() { return dep('subscriptions', 'reducerCreators', 'collectionCreator'); },
  get isReadyCreator() { return dep('subscriptions', 'reducerCreators', 'isReadyCreator'); },
};

export const sagaCreators = {
  get collectionWatcherCreator() {
    return dep('subscriptions', 'sagaCreators', 'collectionWatcherCreator');
  },
  get subscriptionWatcherCreator() {
    return dep('subscriptions', 'sagaCreators', 'subscriptionWatcherCreator');
  },
};

export const sagaHelpers = {
  get waitForReadySubscription() {
    return dep('subscriptions', 'sagaHelpers', 'waitForReadySubscription');
  },
  get waitForConnectionEstablished() {
    return dep('accounts', 'sagaHelpers', 'waitForConnectionEstablished');
  },
};

export const selectors = {
  get getSelectedSiteId() { return dep('router', 'selectors', 'getSelectedSiteId'); },
  get getPathname() { return dep('router', 'selectors', 'getPathname'); },
};

export const types = {
  get ROUTER_DID_CHANGE() { return dep('router', 'types', 'ROUTER_DID_CHANGE'); },
  get SUBSCRIPTION_MODIFIED() { return dep('subscriptions', 'types', 'SUBSCRIPTION_MODIFIED'); },
};
