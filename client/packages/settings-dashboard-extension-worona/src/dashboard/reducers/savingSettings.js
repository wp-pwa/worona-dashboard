import * as types from '../types';

export default (state = false, action) => {
  if (action.type === types.SAVE_SETTINGS_REQUESTED) return action.woronaInfo.name;
  else if (action.type === types.SAVE_SETTINGS_SUCCEED) return false;
  return state;
};
