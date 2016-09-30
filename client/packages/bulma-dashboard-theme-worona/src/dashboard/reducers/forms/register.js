import { combineReducers } from 'redux';
import * as types from '../../types';

export const validationFailed = (state, action) => {
  if (action.type === 'redux-form/SUBMIT_FAILED' && action.form === 'register') {
    return true;
  }
  return false;
};

export const showingTermsAndConditions = (state, action) => {
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
  validationFailed,
  showingTermsAndConditions,
});
