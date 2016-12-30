import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import header from './header';
import siteHome from './siteHome';

export default () => combineReducers({
  header: header(),
  reduxForm,
  siteHome: siteHome(),
});
