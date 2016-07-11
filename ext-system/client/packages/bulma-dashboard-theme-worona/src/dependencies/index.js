import { dep } from 'worona-deps';

export const store = {
  get dispatch() { return dep('store', 'dispatch'); },
};

export const types = {
  get LOGOUT_SUCCEED() { return dep('accounts', 'actiontypes', 'LOGOUT_SUCCEED'); },
};

export const actions = {
  get createAccountRequested() { return dep('accounts', 'actions', 'createAccountRequested'); },
  get loginRequested() { return dep('accounts', 'actions', 'loginRequested'); },
  get logoutRequested() { return dep('accounts', 'actions', 'logoutRequested'); },
  get logoutSucceed() { return dep('accounts', 'actions', 'logoutSucceed'); },
  get createSiteRequested() { return dep('sites', 'actions', 'createSiteRequested'); },
};

export const selectors = {
  get createAccountStatus() { return dep('accounts', 'selectors', 'createAccountStatus'); },
  get createAccountError() { return dep('accounts', 'selectors', 'createAccountError'); },
  get isCreatingAccount() { return dep('accounts', 'selectors', 'isCreatingAccount'); },
  get isLoggingIn() { return dep('accounts', 'selectors', 'isLoggingIn'); },
  get loginStatus() { return dep('accounts', 'selectors', 'loginStatus'); },
  get loginError() { return dep('accounts', 'selectors', 'loginError'); },
  get isCreatingSite() { return dep('sites', 'selectors', 'isCreatingSite'); },
  get createSiteStatus() { return dep('sites', 'selectors', 'createSiteStatus'); },
  get createSiteError() { return dep('sites', 'selectors', 'createSiteError'); },
};

// export const dispatch = () => dep('store', 'dispatch');
// export const LOGOUT_SUCCEED = () => dep('accounts', 'actiontypes', 'LOGOUT_SUCCEED');
//
// export const createAccountRequested = () => dep('accounts', 'actions', 'createAccountRequested');
// export const loginRequested = () => dep('accounts', 'actions', 'loginRequested');
// export const logoutRequested = () => dep('accounts', 'actions', 'logoutRequested');
// export const logoutSucceed = () => dep('accounts', 'actions', 'logoutSucceed');
//
// export const createAccountStatus = () => dep('accounts', 'selectors', 'createAccountStatus');
// export const createAccountError = () => dep('accounts', 'selectors', 'createAccountError');
// export const isCreatingAccount = () => dep('accounts', 'selectors', 'isCreatingAccount');
// export const isLoggingIn = () => dep('accounts', 'selectors', 'isLoggingIn');
// export const loginStatus = () => dep('accounts', 'selectors', 'loginStatus');
// export const loginError = () => dep('accounts', 'selectors', 'loginError');
//
// export const createSiteRequested = () => dep('sites', 'actions', 'createSiteRequested');
//
// export const isCreatingSite = () => dep('sites', 'selectors', 'isCreatingSite');
// export const createSiteStatus = () => dep('sites', 'selectors', 'createSiteStatus');
// export const createSiteError = () => dep('sites', 'selectors', 'createSiteError');
