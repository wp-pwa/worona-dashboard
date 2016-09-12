import { Meteor } from 'meteor/meteor';
import { sites } from './collections';

Meteor.publish('sites', function sitesPublish() {
  return sites.find(
    { userIds: { $in: [this.userId] } },
    { fields: { userIds: 0, createdAt: 0 } }
  );
});
