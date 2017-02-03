import { Meteor } from 'meteor/meteor';
import { unique } from 'shorthash';
import KeyCDN from 'keycdn';
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

const keycdn = new KeyCDN(Meteor.settings.keycdn.apiKey);
export const purgeSite = siteId => new Promise((resolve, reject) => {
  const hashed = unique(siteId).substring(0, 3);
  keycdn.del(`zones/purgetag/${Meteor.settings.keycdn.zoneId}.json`, { tags: [hashed] }, (err) => {
    if (err) reject(err);
    else resolve(true);
  });
});
