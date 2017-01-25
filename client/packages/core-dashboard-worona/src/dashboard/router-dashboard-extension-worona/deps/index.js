import { dep } from 'worona-deps';

export const selectors = {
  get getCssAssets() { return dep('build', 'selectors', 'getCssAssets'); },
  get getThemeName() { return dep('build', 'selectors', 'getThemeName'); },
};

export const actions = {
  get packageAssetFileDownloaded() {
    return dep('build', 'actions', 'packageAssetFileDownloaded');
  },
  get packageAssetFileDontDownloaded() {
    return dep('build', 'actions', 'packageAssetFileDontDownloaded');
  },
};

export const store = {
  get history() {
    return dep('build', 'store', 'history');
  },
};
