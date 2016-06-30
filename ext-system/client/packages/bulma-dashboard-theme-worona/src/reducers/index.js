import { combineReducers } from 'redux';
import header from './header';
import forms from './forms';
import { reducer as reduxForm } from 'redux-form';

export default combineReducers({
  header,
  forms,
  reduxForm,
});
