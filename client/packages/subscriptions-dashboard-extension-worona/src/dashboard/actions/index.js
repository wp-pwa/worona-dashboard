import stringifyError from 'stringify-error-message';
import * as types from '../types';

export const collectionModified = ({ collection, event, id, fields }) =>
({ type: types.COLLECTION_MODIFIED, collection, event, id, fields });

export const subscriptionStarted = ({ subscription }) =>
  ({ type: types.SUBSCRIPTION_STARTED, subscription });

export const subscriptionReady = ({ subscription }) =>
  ({ type: types.SUBSCRIPTION_READY, subscription });

export const subscriptionFailed = ({ subscription, error }) =>
  ({ type: types.SUBSCRIPTION_FAILED, subscription, error: stringifyError(error) });

export const subscriptionStopped = ({ subscription }) =>
  ({ type: types.SUBSCRIPTION_STOPPED, subscription });
