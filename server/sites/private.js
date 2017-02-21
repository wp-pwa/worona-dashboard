import { Meteor } from 'meteor/meteor';
import sites from './collections';

// We had to create a site during createAccount. We couldn't
// call directly to methtods.createSite because that method relies on checkUserLoggedIn,
// and user is not logged in yet during account creation.
// So we created this external function that is now used by both methods.

export const privateCreateSite = ({ name, url, _id, userId, isEditable }) => {
  const createdAt = new Date();
  const modifiedAt = new Date();

  const user = Meteor.users.findOne(userId, { fields: { 'profile.lastSiteNumber': 1 } });
  const siteNumber = user.profile && user.profile.lastSiteNumber
    ? user.profile.lastSiteNumber + 1
    : 1;

  const data = { name, url, userIds: [userId], createdAt, modifiedAt, siteNumber };
  if (_id) data._id = _id;
  if (isEditable !== undefined) data.isEditable = isEditable;
  const siteId = sites.insert(data);

  Meteor.users.update(userId, { $set: { 'profile.lastSiteNumber': siteNumber } });
  Meteor.call('addDefaultSettings', siteId);

  return siteId;
};
