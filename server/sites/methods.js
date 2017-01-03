/* eslint-disable new-cap */
import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import sites from './collections';
import { checkSiteIdOwnership, checkUserLoggedIn } from '../utils';

Meteor.methods({
  createSite({ name, url, _id }) {
    check(name, String);
    check(url, String);
    check(_id, Match.OneOf(String, undefined));
    if (process.env.NODE_ENV === 'development') Meteor._sleepForMs(500);

    const userId = checkUserLoggedIn(this.userId);

    const createdAt = new Date();
    const modifiedAt = new Date();
    const data = { name, url, userIds: [userId], createdAt, modifiedAt };
    if (_id) data._id = _id;

    const siteId = sites.insert(data);

    Meteor.call('addDefaultSettings', siteId);

    return siteId;
  },

  deleteSite({ _id }) {
    check(_id, String);

    if (process.env.NODE_ENV === 'development') Meteor._sleepForMs(500);

    const userId = checkUserLoggedIn(this.userId);
    checkSiteIdOwnership(_id, userId);
    return sites.update({ _id }, { $set: { deleted: true } });
  },

  updateSiteStatus({ _id, status }) {
    check(_id, String);
    check(status, Object);
    check(status.type, String);

    const userId = checkUserLoggedIn(this.userId);
    checkSiteIdOwnership(_id, userId);

    return sites.update(_id, { $set: { status } });
  },

  editSite({ name, url, _id }) {
    check(_id, String);
    check(name, String);
    check(url, String);

    const userId = checkUserLoggedIn(this.userId);
    checkSiteIdOwnership(_id, userId);
    const modifiedAt = new Date();
    return sites.update(_id, { $set: { name, url, modifiedAt } });
  },

});
