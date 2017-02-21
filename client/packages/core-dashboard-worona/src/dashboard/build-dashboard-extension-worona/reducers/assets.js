/* eslint-disable no-undef */
import update from 'react/lib/update';
import { mapValues } from 'lodash';
import { flow, keyBy, mapValues as mapValuesFp } from 'lodash/fp';
import * as types from '../types';

const cdn = window.location.host.startsWith('pre') || window.location.host.startsWith('localhost')
  ? 'precdn'
  : 'cdn';

export default (state = {}, action) => {
  let pkgAssets;
  switch (action.type) {
    case types.PACKAGE_ASSETS_LOAD_REQUESTED:
      pkgAssets = mapValues(action.pkg.assets, item =>
        flow(
          keyBy(
            key =>
              action.pkg.local
                ? `http://localhost:4000/packages/${key}`
                : `https://${cdn}.worona.io/packages/${key}`,
          ),
          mapValuesFp(() => false),
        )(item));
      return update(state, { $merge: { [action.pkg.name]: pkgAssets } });
    case types.PACKAGE_ASSET_FILE_DOWNLOADED:
      return update(state, {
        $merge: { [action.pkgName]: { [action.assetType]: { [action.path]: true } } },
      });
    default:
      return state;
  }
};
