import { dep } from 'worona-deps';

export const store = {
  get dispatch() { return dep('build', 'store', 'dispatch'); },
};

export const types = {
  get LOGOUT_SUCCEED() { return dep('accounts', 'types', 'LOGOUT_SUCCEED'); },
};

export const actions = {
  get createAccountRequested() { return dep('accounts', 'actions', 'createAccountRequested'); },
  get loginRequested() { return dep('accounts', 'actions', 'loginRequested'); },
  get logoutRequested() { return dep('accounts', 'actions', 'logoutRequested'); },
  get logoutSucceed() { return dep('accounts', 'actions', 'logoutSucceed'); },
  get createSiteRequested() { return dep('sites', 'actions', 'createSiteRequested'); },
  get deleteSiteRequested() { return dep('sites', 'actions', 'deleteSiteRequested'); },
};

export const selectors = {
  get getCreateAccountStatus() { return dep('accounts', 'selectors', 'getCreateAccountStatus'); },
  get getCreateAccountError() { return dep('accounts', 'selectors', 'getCreateAccountError'); },
  get getIsCreatingAccount() { return dep('accounts', 'selectors', 'getIsCreatingAccount'); },
  get getIsFirstLogin() { return dep('accounts', 'selectors', 'getIsFirstLogin'); },
  get getIsLoggingIn() { return dep('accounts', 'selectors', 'getIsLoggingIn'); },
  get getLoginStatus() { return dep('accounts', 'selectors', 'getLoginStatus'); },
  get getLoginError() { return dep('accounts', 'selectors', 'getLoginError'); },
  get getIsCreatingSite() { return dep('sites', 'selectors', 'getIsCreatingSite'); },
  get getCreateSiteStatus() { return dep('sites', 'selectors', 'getCreateSiteStatus'); },
  get getCreateSiteError() { return dep('sites', 'selectors', 'getCreateSiteError'); },
  get getAllSites() { return dep('sites', 'selectors', 'getAllSites'); },
  get getSelectedSite() { return dep('sites', 'selectors', 'getSelectedSite'); },
  get getSiteSettingsByCategory() {
    return dep('settings', 'selectors', 'getSiteSettingsByCategory');
  },
  get getSelectedSiteId() { return dep('router', 'selectors', 'getSelectedSiteId'); },
  get getSelectedService() { return dep('router', 'selectors', 'getSelectedService'); },
  get getURLQueries() { return dep('router', 'selectors', 'getURLQueries'); },
  get getNewSiteInfo() { return dep('sites', 'selectors', 'getNewSiteInfo'); },
  get getIsReadySites() { return dep('sites', 'selectors', 'getIsReadySites'); },
  get getIsReadySettings() { return dep('settings', 'selectors', 'getIsReadySettings'); },
};
