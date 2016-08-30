import update from 'react/lib/update';
import { mapValues } from 'lodash';
import * as types from '../types';

export const packages = (state = {}, action) => {
  let newPkgs;
  switch (action.type) {
    case types.PACKAGES_ADDITION_REQUESTED:
      newPkgs = mapValues(action.pkgs, pkg => update(pkg, { $merge: {
        downloaded: false,
        loaded: false,
      } }));
      return update(state, { $merge: newPkgs });
    case types.PACKAGE_DOWNLOAD_SUCCEED:
      return update(state, { [action.pkg.name]: { $merge: { downloaded: true } } });
    case types.PACKAGE_LOAD_SUCCEED:
      return update(state, { [action.pkg.name]: { $merge: { loaded: true } } });
    default:
      return state;
  }
};

export default packages;
