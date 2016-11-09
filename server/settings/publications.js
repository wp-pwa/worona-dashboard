import { Meteor } from 'meteor/meteor';
import { settingsLive } from './collections';
import sites from '../sites/collections';

Meteor.publish('settings', function settingsPublish() {
  this.autorun(() => {
    const userSites = sites.find(
      { userIds: { $in: [this.userId] } },
      { fields: { _id: 1 } }
    );
    const siteIds = userSites.map(site => site._id);
    return settingsLive.find({ siteId: { $in: siteIds } });
  });
});
