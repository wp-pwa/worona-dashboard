/* eslint-disable prefer-arrow-callback */
import { Meteor } from 'meteor/meteor';
import { settingsLive, packages } from './collections';
import sites from '../sites/collections';

Meteor.publish('dashboard-settings-live', function dashboardSettingsLive() {
  this.autorun(() => {
    const userSites = sites.find(
      { userIds: { $in: [this.userId] }, deleted: { $ne: true } },
      { fields: { _id: 1 } }
    );
    const siteIds = userSites.map(site => site._id);
    return settingsLive.find({ 'woronaInfo.siteId': { $in: siteIds }, 'woronaInfo.active': true });
  });
});

Meteor.publish('app-settings-live', ({ siteId }) => {
  const pkgs = packages.find({ app: { $exists: true } }, { fields: { name: 1 } });
  return settingsLive.find({
    'woronaInfo.siteId': { $in: [siteId] },
    'woronaInfo.name': { $in: pkgs.map(pkg => pkg.name) },
  });
});

Meteor.publish('packages', function packagesFromSettings(env = 'prod') {
  this.autorun(() => {
    const userSites = sites.find(
      { userIds: { $in: [this.userId] }, deleted: { $ne: true } },
      { fields: { _id: 1 } }
    );
    const siteIds = userSites.map(site => site._id);
    const settings = settingsLive.find({
      'woronaInfo.siteId': { $in: siteIds },
      'woronaInfo.active': true,
    });
    const packageNames = settings.map(setting => setting.woronaInfo.name);
    return packages.find(
      { name: { $in: packageNames }, dashboard: { $exists: true } },
      {
        fields: {
          name: 1,
          [`dashboard.${env}.main.file`]: 1,
          [`dashboard.${env}.assets`]: 1,
          'dashboard.namespace': 1,
          'dashboard.menu': 1,
        },
      }
    );
  });
});
