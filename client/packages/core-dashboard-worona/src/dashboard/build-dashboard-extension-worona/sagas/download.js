/* eslint-disable no-constant-condition, no-undef, global-require, import/no-dynamic-require */
import { isRemote, packageDownloaded } from 'worona-deps';
import { put, call } from 'redux-saga/effects';
import update from 'react/lib/update';
import { takeEvery } from 'redux-saga';
import * as types from '../types';
import * as actions from '../actions';

// Function used to require local packages. It uses a "require context" of webpack
// so webpack knows about the included packages and create the bundles. We use bundle-loader
// in the webpack config to separate the bundles.
export const requireLocalPackage = pkg => new Promise((resolve) => {
  const pkgName = /(.+)-worona/.exec(pkg.name)[1];
  const req = require(`../../../../../${pkgName}-worona/src/dashboard/index.js`);
  req(module => resolve(module));
});

// Function used to require remote packages. It uses systemjs.import because we
// are now in the browser without webpack. We need to be able to modify those packages without
// having to recompile the core-dashboard-worona package, so we can't use Webpack here.
export const requireRemotePackage = pkg => new Promise((resolve) => {
  SystemJS.import(`https://cdn.worona.io/packages/${pkg.main}`)
  .then(module => resolve(module));
});

// Function triggered by PACKAGE_DOWNLOAD_REQUESTED and used to download each package/module
// and add it to the 'worona-deps' package. It contains the logic to use either
// requireLocalPackage or requireRemotePackage and dispatches PACKAGE_DOWNLOAD_SUCCED or
// PACKAGE_DOWNLOAD_FAILED if necessary.
export function* packageDownloadSaga({ pkg }) {
  const requirePackage = isRemote ? requireRemotePackage : requireLocalPackage;
  try {
    const module = yield call(requirePackage, pkg);
    // Adds the download module to worona-deps.
    yield call(packageDownloaded,
      update(module, { $merge: { name: pkg.name, namespace: pkg.namespace } }));
    yield put(actions.packageDownloadSucceed({ pkg }));
  } catch (error) {
    yield put(actions.packageDownloadFailed({ error: error.message, pkg }));
  }
}

export default function* sagas() {
  yield [
    takeEvery(types.PACKAGE_DOWNLOAD_REQUESTED, packageDownloadSaga),
  ];
}
