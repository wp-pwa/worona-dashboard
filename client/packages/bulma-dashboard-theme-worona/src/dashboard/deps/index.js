import { dep } from 'worona-deps';

export const store = {
  get dispatch() {
    return dep('build', 'store', 'dispatch');
  },
};

export const types = {
  get LOGOUT_SUCCEED() {
    return dep('accounts', 'types', 'LOGOUT_SUCCEED');
  },
  get ROUTER_DID_CHANGE() {
    return dep('router', 'types', 'ROUTER_DID_CHANGE');
  },
  get DELETE_SITE_REQUESTED() {
    return dep('sites', 'types', 'DELETE_SITE_REQUESTED');
  },
};

export const actions = {
  get createAccountRequested() {
    return dep('accounts', 'actions', 'createAccountRequested');
  },
  get loginRequested() {
    return dep('accounts', 'actions', 'loginRequested');
  },
  get logoutRequested() {
    return dep('accounts', 'actions', 'logoutRequested');
  },
  get logoutSucceed() {
    return dep('accounts', 'actions', 'logoutSucceed');
  },
  get forgotPasswordRequested() {
    return dep('accounts', 'actions', 'forgotPasswordRequested');
  },
  get recoverPasswordRequested() {
    return dep('accounts', 'actions', 'recoverPasswordRequested');
  },
  get createSiteRequested() {
    return dep('sites', 'actions', 'createSiteRequested');
  },
  get deleteSiteRequested() {
    return dep('sites', 'actions', 'deleteSiteRequested');
  },
  get checkSiteRequested() {
    return dep('sites', 'actions', 'checkSiteRequested');
  },
  get editSiteRequested() {
    return dep('sites', 'actions', 'editSiteRequested');
  },
};

export const selectors = {
  get getCreateAccountStatus() {
    return dep('accounts', 'selectors', 'getCreateAccountStatus');
  },
  get getCreateAccountError() {
    return dep('accounts', 'selectors', 'getCreateAccountError');
  },
  get getIsCreatingAccount() {
    return dep('accounts', 'selectors', 'getIsCreatingAccount');
  },
  get getIsForgotPasswordRequested() {
    return dep('accounts', 'selectors', 'getIsForgotPasswordRequested');
  },
  get getForgotPasswordStatus() {
    return dep('accounts', 'selectors', 'getForgotPasswordStatus');
  },
  get getForgotPasswordError() {
    return dep('accounts', 'selectors', 'getForgotPasswordError');
  },
  get getIsRecoverPasswordRequested() {
    return dep('accounts', 'selectors', 'getIsRecoverPasswordRequested');
  },
  get getRecoverPasswordStatus() {
    return dep('accounts', 'selectors', 'getRecoverPasswordStatus');
  },
  get getRecoverPasswordError() {
    return dep('accounts', 'selectors', 'getRecoverPasswordError');
  },
  get getIsFirstLogin() {
    return dep('accounts', 'selectors', 'getIsFirstLogin');
  },
  get getIsLoggingIn() {
    return dep('accounts', 'selectors', 'getIsLoggingIn');
  },
  get getLoginStatus() {
    return dep('accounts', 'selectors', 'getLoginStatus');
  },
  get getLoginError() {
    return dep('accounts', 'selectors', 'getLoginError');
  },
  get getIsCreatingSite() {
    return dep('sites', 'selectors', 'getIsCreatingSite');
  },
  get getCreateSiteStatus() {
    return dep('sites', 'selectors', 'getCreateSiteStatus');
  },
  get getCreateSiteError() {
    return dep('sites', 'selectors', 'getCreateSiteError');
  },
  get getIsEditingSite() {
    return dep('sites', 'selectors', 'getIsEditingSite');
  },
  get getEditSiteStatus() {
    return dep('sites', 'selectors', 'getEditSiteStatus');
  },
  get getEditSiteError() {
    return dep('sites', 'selectors', 'getEditSiteError');
  },
  get getAllSites() {
    return dep('sites', 'selectors', 'getAllSites');
  },
  get getSelectedSite() {
    return dep('sites', 'selectors', 'getSelectedSite');
  },
  get getCategories() {
    return dep('settings', 'selectors', 'getCategories');
  },
  get getSelectedSiteId() {
    return dep('router', 'selectors', 'getSelectedSiteId');
  },
  get getSelectedService() {
    return dep('router', 'selectors', 'getSelectedService');
  },
  get getSelectedPackageName() {
    return dep('router', 'selectors', 'getSelectedPackageName');
  },
  get getUrlQueries() {
    return dep('router', 'selectors', 'getUrlQueries');
  },
  get getNewSiteInfo() {
    return dep('sites', 'selectors', 'getNewSiteInfo');
  },
  get getIsReadySites() {
    return dep('sites', 'selectors', 'getIsReadySites');
  },
  get getIsReadySelectedSite() {
    return dep('sites', 'selectors', 'getIsReadySelectedSite');
  },
  get getIsReadySettings() {
    return dep('settings', 'selectors', 'getIsReadySettings');
  },
  get getSelectedPackage() {
    return dep('settings', 'selectors', 'getSelectedPackage');
  },
  get getSelectedPackageIsActivated() {
    return dep('settings', 'selectors', 'getSelectedPackageIsActivated');
  },
  get getSelectedPackageNiceName() {
    return dep('settings', 'selectors', 'getSelectedPackageNiceName');
  },
};

export const selectorCreators = {
  get getUrlQuery() {
    return dep('router', 'selectorCreators', 'getUrlQuery');
  },
  get getCheckSite() {
    return dep('sites', 'selectorCreators', 'getCheckSite');
  },
};

export const sagaHelpers = {
  get waitForConnectionEstablished() {
    return dep('accounts', 'sagaHelpers', 'waitForConnectionEstablished');
  },
};

export const libs = {
  get setSiteIcon() {
    return dep('sites', 'libs', 'setSiteIcon');
  },
};
