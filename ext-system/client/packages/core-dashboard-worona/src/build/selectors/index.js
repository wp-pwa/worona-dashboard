import { createSelector } from 'reselect';
import themes from './themes';
import extensions from './extensions';

const isLoading = createSelector(
  themes.isLoading,
  extensions.isLoading,
  (themesIsLoading, extensionsIsLoading) => themesIsLoading && extensionsIsLoading
);

const isReady = createSelector(
  themes.isReady,
  extensions.isReady,
  (themesIsReady, extensionsIsReady) => themesIsReady && extensionsIsReady
);

export default {
  isLoading,
  isReady,
  themes,
};
