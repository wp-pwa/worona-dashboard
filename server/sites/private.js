import { Meteor } from 'meteor/meteor';
import sites from './collections';

export const privateCreateSite = ({ name, url, _id, userId }) => {
  const createdAt = new Date();
  const modifiedAt = new Date();
  const data = { name, url, userIds: [userId], createdAt, modifiedAt };
  if (_id) data._id = _id;

  const siteId = sites.insert(data);

  Meteor.call('addDefaultSettings', siteId);

  return siteId;
};
