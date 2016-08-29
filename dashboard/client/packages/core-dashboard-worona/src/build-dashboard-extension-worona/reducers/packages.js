import update from 'react/lib/update';
import { flow, mapValues } from 'lodash/fp';
import * as types from '../types';

const mapPkg = (state, pkgName, merge) =>
  update(state, { [pkgName]: { $merge: merge } });

const mapPkgs = (state, pkgs, merge) =>
  update(state, { $merge: flow(
    mapValues(pkg => update(state[pkg.name] || pkg, { $merge: merge })))(pkgs) });

export const packages = (state = {}, action) => {
  switch (action.type) {
    case types.PACKAGES_ADDITION_REQUESTED:
      return update(state, { $merge: mapValues(pkg => update(pkg, { $merge: {
        downloaded: false,
        activated: false,
      } }))(action.pkgs) });
    case types.PACKAGE_DOWNLOAD_SUCCEED:
      return mapPkg(state, action.pkg.name, { downloaded: true });
    case types.PACKAGES_LOAD_SUCCEED:
      return mapPkgs(state, action.pkgs, { loaded: true });
    default:
      return state;
  }
};

export default packages;
