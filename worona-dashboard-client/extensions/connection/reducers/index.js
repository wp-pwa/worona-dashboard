import { combineReducers } from 'redux';

import { CONNECTION_REQUESTED, CONNECTION_SUCCEED, CONNECTION_FAILED, DISCONNECTED }
  from '../actiontypes';

export const isConnected = (state = false, action) => {
  switch (action.type) {
    case CONNECTION_SUCCEED:
      return true;
    case DISCONNECTED:
      return false;
    default:
      return state;
  }
};

export const isConnecting = (state = false, action) => {
  switch (action.type) {
    case CONNECTION_REQUESTED:
      return true;
    case CONNECTION_SUCCEED:
    case CONNECTION_FAILED:
      return false;
    default:
      return state;
  }
};


export default combineReducers({
  isConnected,
  isConnecting,
});
