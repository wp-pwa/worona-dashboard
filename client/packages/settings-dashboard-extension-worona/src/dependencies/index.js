import { dep } from 'worona-deps';

export const reducerCreators = {
  get collectionCreator() { return dep('subscriptions', 'reducerCreators', 'collectionCreator'); },
  get isReadyCreator() { return dep('subscriptions', 'reducerCreators', 'isReadyCreator'); },
};

export const sagaCreators = {
  get subscriptionWatcherCreator() {
    return dep('subscriptions', 'sagaCreators', 'subscriptionWatcherCreator');
  },
};

export const libs = {
  get call() { return dep('connection', 'libs', 'call'); },
};

export const types = {
  get CONNECTION_SUCCEED() { return dep('connection', 'types', 'CONNECTION_SUCCEED'); },
};
