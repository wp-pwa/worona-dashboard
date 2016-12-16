import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import header from './header';
import forms from './forms';
import siteHome from './siteHome';

export default () => combineReducers({
  header: header(),
  forms,
  reduxForm,
  siteHome: siteHome(),
});
