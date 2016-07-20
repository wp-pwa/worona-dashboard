import { dep } from 'worona-deps';

export const store = {
  get dispatch() { return dep('build', 'store', 'dispatch'); },
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
