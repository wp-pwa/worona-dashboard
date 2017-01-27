import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import header from './header';
import siteHome from './siteHome';
import * as types from '../types';
import * as deps from '../deps';

export const displayingDeleteModal = (state = false, action) => {
  switch (action.type) {
    case types.DELETE_MODAL_CLOSED:
    case deps.types.DELETE_SITE_REQUESTED:
      return false;
    case types.DELETE_MODAL_OPENED:
      return true;
    default:
      return state;
  }
};

export const siteBeingDeleted = (state = null, action) => {
  switch (action.type) {
    case types.DELETE_MODAL_OPENED:
      return { id: action.id, name: action.name };
    case types.DELETE_MODAL_CLOSED:
      return null;
    default:
      return state;
  }
};

export default () => combineReducers({
  header: header(),
  reduxForm,
  siteHome: siteHome(),
  displayingDeleteModal,
  siteBeingDeleted,
});
