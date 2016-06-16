import { createSelector } from 'reselect';
import { initialHeaderItems, loggedInItems } from './initialState';

export const formFailed = state => state.theme.forms.register.failed;

export const headerItems = createSelector(
  state => state.accounts.isLoggedIn,
  isLoggedIn => (isLoggedIn ? [...initialHeaderItems, ...loggedInItems] : initialHeaderItems)
);
