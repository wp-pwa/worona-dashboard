/* eslint-disable new-cap */
import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import sites from './collections';
import { checkSiteIdOwnership, checkUserLoggedIn, purgeSite } from '../utils';
import { privateCreateSite } from './private';

Meteor.methods({
  createSite({ siteName, siteUrl, siteId }) {
    check(siteName, String);
    check(siteUrl, String);
    check(siteId, Match.OneOf(String, undefined));
    if (process.env.NODE_ENV === 'development') Meteor._sleepForMs(500);

    const userId = checkUserLoggedIn(this.userId);

    const newId = privateCreateSite({
      name: siteName,
      url: siteUrl,
      _id: siteId,
      userId,
    });

    return sites.findOne(newId);
  },
  deleteSite({ siteId }) {
    check(siteId, String);

    if (process.env.NODE_ENV === 'development') Meteor._sleepForMs(500);

    const userId = checkUserLoggedIn(this.userId);
    checkSiteIdOwnership(siteId, userId);
    return sites.update(siteId, { $set: { deleted: true } });
  },
  updateSiteStatus({ siteId, status }) {
    check(siteId, String);
    check(status, Object);
    check(status.type, String);

    const userId = checkUserLoggedIn(this.userId);
    checkSiteIdOwnership(siteId, userId);

    return sites.update(siteId, { $set: { status } });
  },
  editSite({ siteName, siteUrl, siteId }) {
    check(siteId, String);
    check(siteName, String);
    check(siteUrl, String);

    const userId = checkUserLoggedIn(this.userId);
    checkSiteIdOwnership(siteId, userId);
    const modifiedAt = new Date();

    purgeSite(siteId);

    return sites.update(siteId, {
      $set: { name: siteName, url: siteUrl, modifiedAt }
    });
  }
});
