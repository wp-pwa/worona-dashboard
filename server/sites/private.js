import { Meteor } from 'meteor/meteor';
import sites from './collections';

// We had to create a site during createAccount. We couldn't
// call directly to methtods.createSite because that method relies on checkUserLoggedIn,
// and user is not logged in yet during account creation.
// So we created this external function that is now used by both methods.

export const privateCreateSite = ({ name, url, _id, userId }) => {
  const createdAt = new Date();
  const modifiedAt = new Date();

  const data = { name, url, userIds: [userId], createdAt, modifiedAt };
  if (_id) data._id = _id;

  const siteId = sites.insert(data);

  Meteor.call('addDefaultSettings', siteId);

  return siteId;
};
