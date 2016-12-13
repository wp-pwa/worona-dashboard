import { dep } from 'worona-deps';

export const actions = {
  get saveSettingsRequested() { return dep('settings', 'actions', 'saveSettingsRequested'); },
};

export const elements = {
  get RootContainer() { return dep('theme', 'elements', 'RootContainer'); },
  get Select() { return dep('theme', 'elements', 'Select'); },
};

export const selectorCreators = {
  get getSettingsCreator() { return dep('settings', 'selectorCreators', 'getSettingsCreator'); },
  get getSettingCreator() { return dep('settings', 'selectorCreators', 'getSettingCreator'); },
};

export const types = {
  get DEFAULT_SETTINGS_NEEDED() { return dep('settings', 'types', 'DEFAULT_SETTINGS_NEEDED'); },
};
