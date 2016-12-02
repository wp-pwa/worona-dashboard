import * as deps from '../deps';

export const saveSettings = (setting, caller = deps.libs.call) =>
  caller('saveSettings', setting);
