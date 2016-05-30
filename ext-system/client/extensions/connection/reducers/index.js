import { combineReducers } from 'redux';
import * as t from '../actiontypes';

export const isConnected = (state = false, action) => {
  switch (action.type) {
    case t.CONNECTION_SUCCEED:
      return true;
    case t.DISCONNECTED:
      return false;
    default:
      return state;
  }
};

export const isConnecting = (state = false, action) => {
  switch (action.type) {
    case t.CONNECTION_REQUESTED:
      return true;
    case t.CONNECTION_SUCCEED:
    case t.CONNECTION_FAILED:
      return false;
    default:
      return state;
  }
};


export default combineReducers({
  isConnected,
  isConnecting,
});
