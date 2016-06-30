import worona from 'worona';
import { routerReducer as routing } from 'react-router-redux';
import * as loading from './loading-dashboard-theme-worona';
import * as store from './store-dashboard-extension-worona';
import * as build from './build-dashboard-extension-worona';

worona.build = build;
worona.store = store;
worona.loading = loading;
worona.reducers = {
  build: build.reducers.default,
  routing,
};
