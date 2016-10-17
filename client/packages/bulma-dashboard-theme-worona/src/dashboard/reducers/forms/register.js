import { combineReducers } from 'redux';
import * as types from '../../types';

export const showingTermsAndConditions = (state = false, action) => {
  switch (action.type) {
    case types.TOGGLE_TERMS_AND_CONDITIONS:
      return !state;
    case types.CLOSE_TERMS_AND_CONDITIONS:
      return false;
    default:
      return false;
  }
};

export default combineReducers({
  showingTermsAndConditions,
});
