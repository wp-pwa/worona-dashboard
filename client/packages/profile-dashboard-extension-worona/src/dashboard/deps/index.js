import { dep } from 'worona-deps';

export const reducerCreators = {
  get objectCreator() { return dep('subscriptions', 'reducerCreators', 'objectCreator'); },
  get isReadyCreator() { return dep('subscriptions', 'reducerCreators', 'isReadyCreator'); },
};

export const sagaCreators = {
  get subscriptionWatcherCreator() {
    return dep('subscriptions', 'sagaCreators', 'subscriptionWatcherCreator');
  },
};
