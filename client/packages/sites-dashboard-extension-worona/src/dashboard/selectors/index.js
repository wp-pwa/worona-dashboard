import _ from 'lodash';
import { createSelector } from 'reselect';
import * as deps from '../dependencies';

export const getIsCreatingSite = state => state.sites.isCreatingSite;
export const getCreateSiteStatus = state => state.sites.createSiteStatus;
export const getCreateSiteError = state => state.sites.createSiteError;

export const getAllSites = state => state.sites.collection;
export const getIsReadySites = state => state.sites.isReady;

export const getSite = id => createSelector(
  getAllSites,
  sites => _.find(sites, site => site.id === id)
);

export const getSelectedSite = createSelector(
  deps.selectors.getSelectedSiteId,
  getAllSites,
  (id, sites) => (id ? _.find(sites, site => site.id === id) : {})
);

export const getNewSiteInfo = state => state.sites.newSiteInfo;

export const getCheckSiteObj = (state) => state.sites.checkSite;
export const getCheckSite = (state, id) => state.sites.checkSite[id];
