export const getParam = param => state => state.router.params[param];
export const getSelectedSiteId = state => state.router.params.siteId;
export const getSelectedService = state => state.router.params.service;
export const getSelectedNamespace = state => state.router.params.namespace;
