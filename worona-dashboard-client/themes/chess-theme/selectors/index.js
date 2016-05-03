import { createSelector } from 'reselect';
import { initialHeaderItems, loggedInItems } from '../config';

export const formFailed = state => state.theme.forms.register.failed;

export const headerItems = createSelector(
  state => state.accounts.isLoggedIn,
  isLoggedIn => (isLoggedIn ? [...initialHeaderItems, ...loggedInItems] : initialHeaderItems)
);

export { createAccountStatus, createAccountError, isCreatingAccount, isLoggingIn, loginStatus,
  loginError } from '../dependencies';
