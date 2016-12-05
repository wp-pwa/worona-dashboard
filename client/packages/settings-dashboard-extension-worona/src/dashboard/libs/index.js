import * as deps from '../deps';

export const saveSettings = (settings, caller = deps.libs.call) => caller('saveSettings', settings);
