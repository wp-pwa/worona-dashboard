/* eslint-disable new-cap */
import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import { settingsLive } from './collections';
import defaultSettings from './defaultSettings';
import { checkSiteIdOwnership, checkUserLoggedIn, purgeSite } from '../utils';

const addSettings = ({ name, namespace, siteId }) => {
  check(name, String);
  check(namespace, Match.OneOf(String, undefined));
  check(siteId, String);

  return settingsLive.findOne({
    'woronaInfo.name': name,
    'woronaInfo.siteId': siteId,
  })
    ? false
    : settingsLive.insert({
        woronaInfo: {
          name,
          namespace,
          siteId,
          active: true,
          init: false,
        },
      });
};

Meteor.methods({
  activateExtension({ name, siteId }) {
    const userId = this.userId;
    checkSiteIdOwnership(siteId, userId);

    const settings = settingsLive.findOne({
      'woronaInfo.name': name,
      'woronaInfo.siteId': siteId,
    }, { fields: { _id: 1 }});

    if (settings) {
      settingsLive.update(settings._id, { $set: { 'woronaInfo.active': true }});
    } else {
      addSettings({ name, siteId });
    }
  },

  saveSettings(settings) {
    const userId = this.userId;
    const name = settings.woronaInfo.name;
    const siteId = settings.woronaInfo.siteId;

    check(name, String);
    check(siteId, String);
    checkUserLoggedIn(userId);
    checkSiteIdOwnership(siteId, userId);

    const newSettingData = {};
    Object.assign(newSettingData, settings);
    delete newSettingData.woronaInfo;
    newSettingData['woronaInfo.init'] = true;

    const id = settingsLive.findOne({
      'woronaInfo.name': name,
      'woronaInfo.siteId': siteId,
    })._id;

    purgeSite(siteId);

    return settingsLive.update(id, { $set: newSettingData });
  },

  addSettings(options) {
    return addSettings(options);
  },

  addDefaultSettings(siteId) {
    defaultSettings.forEach(pkg => {
      addSettings({ name: pkg.name, namespace: pkg.namespace, siteId });
    });
  },
});
