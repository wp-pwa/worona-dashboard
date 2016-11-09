import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { settingsLive } from './collections';
import defaultSettings from './defaultSettings';

Meteor.methods({
  saveSettings(setting) {
    check(setting.name, String);
    return;
  },
  initSettings(siteId) {
    check(siteId, String);
    defaultSettings.forEach(setting => {
      const woronaInfo = Object.assign({}, setting.woronaInfo, { siteId });
      settingsLive.insert(Object.assign({}, setting, { woronaInfo }));
    });
  },
});
