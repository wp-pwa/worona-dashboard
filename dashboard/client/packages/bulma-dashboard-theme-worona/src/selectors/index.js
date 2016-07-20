import { createSelector } from 'reselect';
import { initialHeaderItems, loggedInItems } from './initialState';

export const formFailed = state => state.bulma.forms.register.failed;

export const headerItems = createSelector(
  state => state.accounts && state.accounts.isLoggedIn,
  isLoggedIn => (isLoggedIn ? [...initialHeaderItems, ...loggedInItems] : initialHeaderItems)
);
