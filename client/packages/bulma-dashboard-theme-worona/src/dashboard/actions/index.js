import * as types from '../types';

export const toggleMobileMenu = () => ({ type: types.TOGGLE_MOBILE_MENU });
export const closeMobileMenu = () => ({ type: types.CLOSE_MOBILE_MENU });
export const toggleTermsAndConditions = () => ({ type: types.TOGGLE_TERMS_AND_CONDITIONS });
export const closeTermsAndConditions = () => ({ type: types.CLOSE_TERMS_AND_CONDITIONS });
export const uploadSucceed = (fileId, siteId) => ({ type: types.UPLOAD_SUCCEED, fileId, siteId });
export const uploadError = (status) => ({ type: types.UPLOAD_ERROR, status });
