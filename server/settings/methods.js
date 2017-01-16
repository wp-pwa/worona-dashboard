/* eslint-disable new-cap */
import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import { unique } from 'shorthash';
import KeyCDN from 'keycdn';
import { settingsLive } from './collections';
import defaultSettings from './defaultSettings';
import { checkSiteIdOwnership, checkUserLoggedIn } from '../utils';

const addSettings = ({ name, namespace, siteId }) => {
  check(name, String);
  check(namespace, Match.OneOf(String, undefined));
  check(siteId, String);

  return settingsLive.findOne({ 'woronaInfo.name': name, 'woronaInfo.siteId': siteId }) ? false :
    settingsLive.insert({ woronaInfo: {
      name,
      namespace,
      siteId,
      active: true,
      init: false,
    } });
};

const keycdn = new KeyCDN(Meteor.settings.keycdn.apiKey);
const purgeSite = siteId => new Promise((resolve, reject) => {
  const hashed = unique(siteId).substring(0, 3);
  keycdn.del(`zones/purgetag/${Meteor.settings.keycdn.zoneId}.json`, { tags: [hashed] }, (err) => {
    if (err) reject(err);
    else resolve(true);
  });
});


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
    newSettingData['woronaInfo.init'] = true;

    const id = settingsLive.findOne({ 'woronaInfo.name': name, 'woronaInfo.siteId': siteId })._id;

    purgeSite(siteId);

    return settingsLive.update(id, { $set: newSettingData });
  },

  addSettings(options) { return addSettings(options); },

  addDefaultSettings(siteId) {
    defaultSettings.forEach(pkg => {
      addSettings({ name: pkg.name, namespace: pkg.namespace, siteId });
    });
  },
});
