import { dep } from 'worona-deps';

export const actions = {
  get saveSettingRequested() { return dep('settings', 'actions', 'saveSettingRequested'); },
};

export const elements = {
  get RootContainer() { return dep('theme', 'elements', 'RootContainer'); },
};
