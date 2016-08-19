import { combineReducers } from 'redux';

export const validationFailed = (state, action) => {
  if (action.type === 'redux-form/SUBMIT_FAILED' && action.form === 'register') {
    return true;
  }
  return false;
};

export default combineReducers({
  validationFailed,
});
