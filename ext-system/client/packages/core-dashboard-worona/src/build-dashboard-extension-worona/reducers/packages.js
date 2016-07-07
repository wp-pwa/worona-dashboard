import * as t from '../types';

export const isDownloading = (state = false, action) => {
  switch (action.type) {
    case t.PACKAGES_DOWNLOAD_REQUESTED:
      return true;
    case t.PACKAGES_DOWNLOAD_SUCCEED:
    case t.PACKAGES_DOWNLOAD_FAILED:
      return false;
    default:
      return state;
  }
};

export const isLoading = (state = false, action) => {

};

export const isReady = (state = false, action) => {

};

export const requested = (state = false, action) => {

};

export const downloaded = (state = false, action) => {

};

export const loaded = (state = false, action) => {

};
