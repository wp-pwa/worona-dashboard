import worona from 'worona';

module.exports = {
  get store() { return worona.store; },

  get LOGOUT_SUCCEED() { return worona.accounts.actiontypes.LOGOUT_SUCCEED; },

  get createAccountRequested() { return worona.accounts.actions.createAccountRequested; },
  get loginRequested() { return worona.accounts.actions.loginRequested; },
  get logoutRequested() { return worona.accounts.actions.logoutRequested; },
  get logoutSucceed() { return worona.accounts.actions.logoutSucceed; },

  get createAccountStatus() { return worona.accounts.selectors.createAccountStatus; },
  get createAccountError() { return worona.accounts.selectors.createAccountError; },
  get isCreatingAccount() { return worona.accounts.selectors.isCreatingAccount; },
  get isLoggingIn() { return worona.accounts.selectors.isLoggingIn; },
  get loginStatus() { return worona.accounts.selectors.loginStatus; },
  get loginError() { return worona.accounts.selectors.loginError; },

  get createSiteRequested() { return worona.sites.actions.createSiteRequested; },

  get isCreatingSite() { return worona.sites.selectors.isCreatingSite; },
  get createSiteStatus() { return worona.sites.selectors.createSiteStatus; },
  get createSiteError() { return worona.sites.selectors.createSiteError; },
};
