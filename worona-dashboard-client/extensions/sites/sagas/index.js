import { fork } from 'redux-saga/effects';
import { createSiteWatcher } from './createSite';
import { subscriptionWatcherCreator } from '../dependencies';

const sitesSubscriptionWatcher = subscriptionWatcherCreator('sites');

export default function* () {
  yield [
    fork(createSiteWatcher),
    fork(sitesSubscriptionWatcher),
  ];
}
