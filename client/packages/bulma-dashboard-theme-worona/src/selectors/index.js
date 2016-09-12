import { createSelector } from 'reselect';
import { initialHeaderItems, loggedInItems } from './initialState';

export const getShowMobileMenu = state => state.theme.header.showingMobileMenu;

export const getHeaderItems = createSelector(
  state => state.accounts && state.accounts.isLoggedIn,
  isLoggedIn => (isLoggedIn ? [...initialHeaderItems, ...loggedInItems] : initialHeaderItems)
);
