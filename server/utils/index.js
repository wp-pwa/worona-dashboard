import sites from '../sites/collections';
import * as errors from '../errors';

export const checkSiteIdOwnership = (siteId, userId) => {
  const site = sites.findOne({ _id: siteId });
  if (!site) {
    throw new Error('Site ID not found.');
  }

  if (site.userIds.indexOf(userId) < 0) {
    throw new Error('Current user doesn\'t own the selected site');
  }
  return true;
};

export const checkUserLoggedIn = (userId) => {
  if (!userId) {
    throw new Error(errors.NOT_LOGGED_IN);
  }
  return userId;
};
