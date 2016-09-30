import { createSelector } from 'reselect';
import * as deps from '../dependencies';
import _ from 'lodash';

export const getIsCreatingSite = state => state.sites.isCreatingSite;
export const getCreateSiteStatus = state => state.sites.createSiteStatus;
export const getCreateSiteError = state => state.sites.createSiteError;

export const getAllSites = state => state.sites.collection;

export const getSite = id => createSelector(
  getAllSites,
  sites => _.find(sites, site => site.id === id)
);

export const getSelectedSite = createSelector(
  deps.selectors.getSelectedSiteId,
  getAllSites,
  (id, sites) => (id ? _.find(sites, site => site.id === id) : {})
);
