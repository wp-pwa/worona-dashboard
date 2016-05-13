import { SUBSCRIPTION_MODIFIED, SUBSCRIPTION_STARTED, SUBSCRIPTION_READY, SUBSCRIPTION_FAILED,
  SUBSCRIPTION_STOPPED } from '../actiontypes';

export const subscriptionStarted = collection => ({ type: SUBSCRIPTION_STARTED, collection });
export const subscriptionModified = (collection, event, id, fields) =>
  ({ type: SUBSCRIPTION_MODIFIED, collection, event, id, fields });
export const subscriptionReady = collection => ({ type: SUBSCRIPTION_READY, collection });
export const subscriptionFailed = (collection, error) =>
  ({ type: SUBSCRIPTION_FAILED, collection, error });
export const subscriptionStopped = collection => ({ type: SUBSCRIPTION_STOPPED, collection });
