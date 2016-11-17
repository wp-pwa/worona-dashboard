import { Mongo } from 'meteor/mongo';

export const settingsLive = new Mongo.Collection('settings-live');
export const settingsPreview = new Mongo.Collection('settings-preview');
export const packages = new Mongo.Collection('packages');
