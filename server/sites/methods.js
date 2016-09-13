/* eslint-disable new-cap */
import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import { sites } from './collections';

Meteor.methods({
  createSite({ name, url, _id }) {
    check(name, String);
    check(url, String);
    check(_id, Match.OneOf(String, undefined));
    if (process.env.NODE_ENV === 'development') Meteor._sleepForMs(500);

    if (!this.userId) {
      return new Meteor.Error('User is not logged in.');
    }

    const userId = this.userId;
    const createdAt = new Date();
    const modifiedAt = new Date();
    const data = { name, url, userIds: [userId], createdAt, modifiedAt };
    if (!!_id) data._id = _id;

    return sites.insert(data);
  },
  deleteSite({ _id }) {
    check(_id, String);

    if (process.env.NODE_ENV === 'development') Meteor._sleepForMs(2000);

    const userId = this.userId;
    if (!userId) {
      return new Meteor.Error('User is not logged in.');
    }

    const site = sites.findOne({ _id });
    if (!site) {
      return new Meteor.Error('Site ID not found.');
    }

    if (site.userIds.indexOf(userId) < 0) {
      return new Meteor.Error('Current user doesn\'t own the selected site');
    }

    return sites.remove({ _id }, true);
  },
});
