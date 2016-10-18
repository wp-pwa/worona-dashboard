import update from 'react/lib/update';
import { mapValues } from 'lodash';
import { flow, keyBy, mapValues as mapValuesFp } from 'lodash/fp';
import * as types from '../types';

export const assets = (state = {}, action) => {
  let pkgAssets;
  switch (action.type) {
    case types.PACKAGE_ASSETS_LOAD_REQUESTED:
      pkgAssets = mapValues(action.pkg.prod.assets, item => flow(
        keyBy(key => key),
        mapValuesFp(() => false)
      )(item));
      return update(state, { $merge: { [action.pkg.name]: pkgAssets } });
    case types.PACKAGE_ASSET_FILE_DOWNLOADED:
      return update(state,
        { $merge: { [action.pkgName]: { [action.assetType]: { [action.path]: true } } } });
    default:
      return state;
  }
};

export default assets;
