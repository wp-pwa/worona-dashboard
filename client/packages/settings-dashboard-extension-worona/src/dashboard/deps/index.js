import { dep } from 'worona-deps';

export const libs = {
  get call() {
    return dep('connection', 'libs', 'call');
  },
  get subscription() {
    return dep('subscriptions', 'libs', 'subscription');
  },
};

export const reducerCreators = {
  get collectionCreator() {
    return dep('subscriptions', 'reducerCreators', 'collectionCreator');
  },
  get isReadyCreator() {
    return dep('subscriptions', 'reducerCreators', 'isReadyCreator');
  },
};

export const sagaHelpers = {
  get waitForReady() {
    return dep('subscriptions', 'sagaHelpers', 'waitForReadySubscription');
  },
  get waitForConnectionEstablished() {
    return dep('accounts', 'sagaHelpers', 'waitForConnectionEstablished');
  },
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
  get getSelectedSiteId() {
    return dep('router', 'selectors', 'getSelectedSiteId');
  },
  get getSelectedPackageName() {
    return dep('router', 'selectors', 'getSelectedPackageName');
  },
  get getSelectedService() {
    return dep('router', 'selectors', 'getSelectedService');
  },
  get getActivatedPackages() {
    return dep('build', 'selectors', 'getActivatedPackages');
  },
};

export const types = {
  get SUBSCRIPTION_READY() {
    return dep('subscriptions', 'types', 'SUBSCRIPTION_READY');
  },
  get COLLECTION_MODIFIED() {
    return dep('subscriptions', 'types', 'COLLECTION_MODIFIED');
  },
  get PACKAGE_ACTIVATION_SUCCEED() {
    return dep('build', 'types', 'PACKAGE_ACTIVATION_SUCCEED');
  },
  get CREATE_SITE_SUCCEED() {
    return dep('sites', 'types', 'CREATE_SITE_SUCCEED');
  },
};

export const actions = {
  get packageActivationRequested() {
    return dep('build', 'actions', 'packageActivationRequested');
  },
  get packageDeactivationRequested() {
    return dep('build', 'actions', 'packageDeactivationRequested');
  },
};
