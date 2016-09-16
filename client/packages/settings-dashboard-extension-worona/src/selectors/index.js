import { createSelector } from 'reselect';
export const getAllSettings = state => state.settings.collection;

export const getDefaultSettings = id => createSelector(
  getAllSettings,
  settings => settings.filter(setting => setting.siteId === id)
);
