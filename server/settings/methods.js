import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { settingsLive } from './collections';
import defaultSettings from './defaultSettings';
import { checkSiteIdOwnership, checkUserLoggedIn } from '../utils';

Meteor.methods({
  saveSettings(setting) {
    check(setting._id, String);
    check(setting.woronaInfo.name, String);
    check(setting.woronaInfo.active, Boolean);
    check(setting.woronaInfo.siteId, String);

    const userId = this.userId;
    checkUserLoggedIn(userId);

    const siteId = setting.woronaInfo.siteId;
    checkSiteIdOwnership(siteId, userId);

    const newSettingData = {};
    Object.assign(newSettingData, setting);
    delete newSettingData.woronaInfo;

    return settingsLive.update(setting._id, { $set: newSettingData });
  },
  initSettings(siteId) {
    check(siteId, String);
    defaultSettings.forEach(setting => {
      const woronaInfo = Object.assign({}, setting.woronaInfo, { siteId });
      settingsLive.insert(Object.assign({}, setting, { woronaInfo }));
    });
  },
});
