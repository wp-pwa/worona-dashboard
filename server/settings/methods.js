import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { settings } from './collections';
import { defaultSettings } from './defaultSettings';

Meteor.methods({
  saveSettings(setting) {
    check(setting.name, String);
    return;
  },
  initSettings(siteId) {
    check(siteId, String);
    defaultSettings.forEach(setting =>
      settings.insert(Object.assign({}, setting, { siteId })));
  },
});
