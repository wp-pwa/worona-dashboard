import { createSelector } from 'reselect';
import { find } from 'lodash';
import * as selectors from '../selectors';

export const getSite = id => createSelector(
  selectors.getAllSites,
  sites => find(sites, site => site.id === id)
);
export const getCheckSite = id => state => state.sites.checkSite[id];
