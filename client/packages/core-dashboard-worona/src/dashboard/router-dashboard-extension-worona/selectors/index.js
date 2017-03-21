export const getParam = param => state => state.router.params[param];
export const getPathname = state => state.router.location.pathname;
export const getSelectedSiteId = state =>
  state.router && state.router.params && state.router.params.siteId;
export const getSelectedService = state => state.router.params.service;
export const getSelectedPackageName = state => state.router.params.packageName;
export const getUrlQueries = state => state.router.location.query;
