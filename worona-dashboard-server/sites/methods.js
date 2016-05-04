/* eslint-disable new-cap */
import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import { sites } from './collections';

Meteor.methods({
  createSite({ name, url, _id }) {
    check(name, String);
    check(url, String);
    check(_id, Match.OneOf(String, undefined));

    if (!this.userId) {
      return false;
    }

    const userId = this.userId;
    const data = !!_id ? { name, url, userId, _id } : { name, url, userId };

    Meteor._sleepForMs(2000);

    return sites.insert(data);
  },
});
