import { dep } from 'worona-deps';

export const reducerCreators = {
  get collectionCreator() { return dep('subscriptions', 'reducerCreators', 'collectionCreator'); },
  get isReadyCreator() { return dep('subscriptions', 'reducerCreators', 'isReadyCreator'); },
};

export const sagaHelpers = {
  get waitForReady() { return dep('subscriptions', 'sagaHelpers', 'waitForReadySubscription'); },
};

export const sagaCreators = {
  get subscriptionWatcherCreator() {
    return dep('subscriptions', 'sagaCreators', 'subscriptionWatcherCreator');
  },
  get collectionWatcherCreator() {
    return dep('subscriptions', 'sagaCreators', 'collectionWatcherCreator');
  },
};

export const selectors = {
  get getSelectedSiteId() { return dep('router', 'selectors', 'getSelectedSiteId'); },
  get getSelectedPackageName() { return dep('router', 'selectors', 'getSelectedPackageName'); },
  get getSelectedService() { return dep('router', 'selectors', 'getSelectedService'); },
  get getActivatedPackages() { return dep('build', 'selectors', 'getActivatedPackages'); },
};

export const types = {
  get SUBSCRIPTION_READY() { return dep('subscriptions', 'types', 'SUBSCRIPTION_READY'); },
};

export const actions = {
  get packageActivationRequested() { return dep('build', 'actions', 'packageActivationRequested'); },
};
