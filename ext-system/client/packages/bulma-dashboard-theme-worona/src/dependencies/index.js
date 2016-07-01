import { dep } from 'worona-deps';

export const dispatch = () => dep('store', 'dispatch');
export const LOGOUT_SUCCEED = () => dep('accounts', 'actiontypes', 'LOGOUT_SUCCEED');

export const createAccountRequested = () => dep('accounts', 'actions', 'createAccountRequested');
export const loginRequested = () => dep('accounts', 'actions', 'loginRequested');
export const logoutRequested = () => dep('accounts', 'actions', 'logoutRequested');
export const logoutSucceed = () => dep('accounts', 'actions', 'logoutSucceed');

export const createAccountStatus = () => dep('accounts', 'selectors', 'createAccountStatus');
export const createAccountError = () => dep('accounts', 'selectors', 'createAccountError');
export const isCreatingAccount = () => dep('accounts', 'selectors', 'isCreatingAccount');
export const isLoggingIn = () => dep('accounts', 'selectors', 'isLoggingIn');
export const loginStatus = () => dep('accounts', 'selectors', 'loginStatus');
export const loginError = () => dep('accounts', 'selectors', 'loginError');

export const createSiteRequested = () => dep('sites', 'actions', 'createSiteRequested');

export const isCreatingSite = () => dep('sites', 'selectors', 'isCreatingSite');
export const createSiteStatus = () => dep('sites', 'selectors', 'createSiteStatus');
export const createSiteError = () => dep('sites', 'selectors', 'createSiteError');
