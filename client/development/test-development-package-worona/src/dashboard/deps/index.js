import { dep } from 'worona-deps';

export const elements = {
  get RootContainer() { return dep('theme', 'elements', 'RootContainer'); },
};

export const selectorCreators = {
  get getSettings() { return dep('settings', 'selectorCreators', 'getSettings'); },
  get getSetting() { return dep('settings', 'selectorCreators', 'getSetting'); },
};

export const types = {
  get DEFAULT_SETTINGS_NEEDED() { return dep('settings', 'types', 'DEFAULT_SETTINGS_NEEDED'); },
};
