import { combineReducers } from 'redux';
import * as types from '../types';

export const isConnected = (state = false, action) => {
  switch (action.type) {
    case types.CONNECTION_SUCCEED:
      return true;
    case types.DISCONNECTED:
      return false;
    default:
      return state;
  }
};

export const isConnecting = (state = false, action) => {
  switch (action.type) {
    case types.CONNECTION_REQUESTED:
      return true;
    case types.CONNECTION_SUCCEED:
    case types.CONNECTION_FAILED:
      return false;
    default:
      return state;
  }
};

export default combineReducers({
  isConnected,
  isConnecting,
});
