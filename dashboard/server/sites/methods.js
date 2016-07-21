/* eslint-disable new-cap */
import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import { sites } from './collections';

Meteor.methods({
  createSite({ name, url, _id }) {
    check(name, String);
    check(url, String);
    check(_id, Match.OneOf(String, undefined));

    if (process.env.NODE_ENV === 'development') Meteor._sleepForMs(2000);

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
});
