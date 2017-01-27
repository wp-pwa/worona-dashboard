import * as types from '../types';

export const toggleMobileMenu = () => ({ type: types.TOGGLE_MOBILE_MENU });
export const closeMobileMenu = () => ({ type: types.CLOSE_MOBILE_MENU });
export const toggleSiteHomeMobileMenu = () => ({ type: types.TOGGLE_SITEHOME_MOBILE_MENU });
export const closeSiteHomeMobileMenu = () => ({ type: types.CLOSE_SITEHOME_MOBILE_MENU });
export const deleteModalOpened = ({ id, name }) => ({ type: types.DELETE_MODAL_OPENED, id, name });
export const deleteModalClosed = () => ({ type: types.DELETE_MODAL_CLOSED });
