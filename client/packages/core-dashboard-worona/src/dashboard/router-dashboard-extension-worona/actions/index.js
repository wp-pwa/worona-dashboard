import * as types from '../types';

export const siteSelected = ({ siteId }) => ({ type: types.SITE_SELECTED, siteId });
export const siteUnselected = () => ({ type: types.SITE_UNSELECTED });
