import { createSelector } from 'reselect';
import themes from './themes';
import extensions from './extensions';

export const isLoading = createSelector(
  state => state.build.themes.isLoading,
  state => state.build.extensions.isLoading,
  (themesIsLoading, extensionsIsLoading) => themesIsLoading && extensionsIsLoading
);

export const isReady = createSelector(
  state => state.build.themes.isReady,
  state => state.build.extensions.isReady,
  (themesIsReady, extensionsIsReady) => themesIsReady && extensionsIsReady
);

export default {
  isLoading,
  isReady,
  themes,
  extensions,
};
