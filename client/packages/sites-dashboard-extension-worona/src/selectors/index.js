import { createSelector } from 'reselect';
import _ from 'lodash';

export const getAllSites = state => state.sites.collection;
export const isCreatingSite = state => state.sites.isCreatingSite;
export const createSiteStatus = state => state.sites.createSiteStatus;
export const createSiteError = state => state.sites.createSiteError;

export const getSiteInfo = id => createSelector(
  getAllSites,
  (sites) => _.find(sites, site => site.id === id)
);
