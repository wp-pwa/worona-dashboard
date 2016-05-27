import { createSelector } from 'reselect';
import themes from './themes';
import extensions from './extensions';

const isLoading = createSelector(
  themes.isLoading,
  extensions.isLoading,
  themesIsLoading => themesIsLoading
);

const isLoaded = createSelector(
  themes.isLoaded,
  extensions.isLoaded,
  themesIsLoaded => themesIsLoaded
);

export default {
  isLoading,
  isLoaded,
  themes,
};
