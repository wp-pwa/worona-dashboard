export const store = window.worona.store;

export const LOGOUT_SUCCEED = window.worona.accounts.actiontypes.LOGOUT_SUCCEED;

export const createAccountRequested = window.worona.accounts.actions.createAccountRequested;
export const loginRequested = window.worona.accounts.actions.loginRequested;
export const logoutRequested = window.worona.accounts.actions.logoutRequested;
export const logoutSucceed = window.worona.accounts.actions.logoutSucceed;

export const createAccountStatus = window.worona.accounts.selectors.createAccountStatus;
export const createAccountError = window.worona.accounts.selectors.createAccountError;
export const isCreatingAccount = window.worona.accounts.selectors.isCreatingAccount;
export const isLoggingIn = window.worona.accounts.selectors.isLoggingIn;
export const loginStatus = window.worona.accounts.selectors.loginStatus;
export const loginError = window.worona.accounts.selectors.loginError;

export const createSiteRequested = window.worona.sites.actions.createSiteRequested;

export const isCreatingSite = window.worona.sites.selectors.isCreatingSite;
export const createSiteStatus = window.worona.sites.selectors.createSiteStatus;
export const createSiteError = window.worona.sites.selectors.createSiteError;
