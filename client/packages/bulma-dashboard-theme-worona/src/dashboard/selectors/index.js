import { createSelector } from 'reselect';
import { initialHeaderItems, loggedInItems } from './initialState';

export const getShowMobileMenu = state => state.theme.header.showingMobileMenu;

export const getDisplayingDeleteModal = state => state.theme && state.theme.displayingDeleteModal;

export const getSiteIdBeingDeleted = state =>
  state.theme && state.theme.siteBeingDeleted && state.theme.siteBeingDeleted.id;
export const getSiteNameBeingDeleted = state =>
  state.theme && state.theme.siteBeingDeleted && state.theme.siteBeingDeleted.name;

export const getHeaderItems = createSelector(
  state => state.accounts && state.accounts.isLoggedIn,
  isLoggedIn => (isLoggedIn ? [...initialHeaderItems, ...loggedInItems] : initialHeaderItems)
);
