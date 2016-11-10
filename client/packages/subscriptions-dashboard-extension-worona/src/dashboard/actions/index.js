import stringifyError from 'stringify-error-message';
import * as types from '../types';

export const subscriptionStarted = collection =>
  ({ type: types.SUBSCRIPTION_STARTED, collection });

export const subscriptionModified = ({ collection, event, id, fields }) =>
  ({ type: types.SUBSCRIPTION_MODIFIED, collection, event, id, fields });

export const subscriptionReady = collection =>
  ({ type: types.SUBSCRIPTION_READY, collection });

export const subscriptionFailed = (collection, errorObj) =>
  ({ type: types.SUBSCRIPTION_FAILED, collection, error: stringifyError(errorObj) });

export const subscriptionStopped = collection =>
  ({ type: types.SUBSCRIPTION_STOPPED, collection });
