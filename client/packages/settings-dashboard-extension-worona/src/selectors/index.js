import { createSelector } from 'reselect';
export const getAllSettings = state => state.settings.collection;
export const getCategories = state => state.settings.categories;
export const getSiteSettings = id => createSelector(
  getAllSettings,
  settings => settings.filter(setting => setting.siteId === id)
);
export const getSiteSettingsByCategory = (id) => createSelector(
  getCategories,
  getSiteSettings(id),
  (categories, settings) => categories.map(({ name }) => ({
    name,
    settings: settings.filter(entry => entry.categoryName === name),
  }))
);
