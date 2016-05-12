import { SUBSCRIPTION_MODIFIED, SUBSCRIPTION_STARTED, SUBSCRIPTION_READY, SUBSCRIPTION_FAILED,
  SUBSCRIPTION_STOPPED } from '../actiontypes';

export const subscriptionStarted = () => ({ type: SUBSCRIPTION_STARTED });
export const subscriptionModified = ({ event, collection, id, fields }) =>
  ({ type: SUBSCRIPTION_MODIFIED, event, collection, id, fields });
export const subscriptionReady = () => ({ type: SUBSCRIPTION_READY });
export const subscriptionFailed = error => ({ type: SUBSCRIPTION_FAILED, error });
export const subscriptionStopped = () => ({ type: SUBSCRIPTION_STOPPED });
