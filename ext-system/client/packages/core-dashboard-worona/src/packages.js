import { addPackage } from 'worona-deps';
import { routerReducer as routing } from 'react-router-redux';
import * as loading from './loading-dashboard-theme-worona';
import * as build from './build-dashboard-extension-worona';

addPackage('build', build);
addPackage('loading', loading);
addPackage('routing', { reducers: { default: routing } });
