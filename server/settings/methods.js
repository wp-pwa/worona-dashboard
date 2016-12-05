import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { settingsLive } from './collections';
import defaultSettings from './defaultSettings';
import { checkSiteIdOwnership, checkUserLoggedIn } from '../utils';

Meteor.methods({
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

    const id = settingsLive.findOne({ 'woronaInfo.name': name, 'woronaInfo.siteId': siteId })._id;

    return settingsLive.update(id, { $set: newSettingData });
  },

  initSettings(siteId) {
    check(siteId, String);
    defaultSettings.forEach(setting => {
      const woronaInfo = Object.assign({}, setting.woronaInfo, { siteId });
      settingsLive.insert(Object.assign({}, setting, { woronaInfo }));
    });
  },
});
