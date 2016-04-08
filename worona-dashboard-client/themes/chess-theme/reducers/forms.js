import { combineReducers } from 'redux';

const failed = (state, action) => {
  if (action.type === 'redux-form/SUBMIT_FAILED' && action.form === 'register') {
    return true;
  }
  return false;
};

const register = combineReducers({
  failed,
});

export const forms = combineReducers({
  register,
});
