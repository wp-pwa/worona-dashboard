import { dep } from 'worona-deps';

export const actions = {
  get saveSettingRequested() { return dep('settings', 'actions', 'saveSettingRequested'); },
};

export const elements = {
  get RootContainer() { return dep('theme', 'elements', 'RootContainer'); },
};

export const selectorCreators = {
  get getSettingsCreator() { return dep('settings', 'selectorCreators', 'getSettingsCreator'); },
  get getSettingCreator() { return dep('settings', 'selectorCreators', 'getSettingCreator'); },
};
