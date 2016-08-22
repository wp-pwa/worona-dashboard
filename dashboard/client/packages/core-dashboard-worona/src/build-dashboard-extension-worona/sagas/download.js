/* eslint-disable no-constant-condition */
import { put, call, race } from 'redux-saga/effects';
import { addPackage } from 'worona-deps';
import _ from 'lodash';
import * as types from '../types';
import * as actions from '../actions';

// Function used to require local packages. It uses a "require context" of webpack
// so webpack knows about the included packages and create the bundles. We use bundle-loader
// in the webpack config to separate the bundles.
export const requireLocalPackage = pkg => new Promise(resolve => {
  debugger;
  const pkgName = `./${pkg.name}/src/index.js`;
  // const req = require(`../../../../${pkgName}-worona/src/index.js`);
  const req = require.context('../../../../', false, /-worona\/src\/index\.js$/);
  resolve(req(pkgName));
});

// Function used to require remote packages. It uses systemjs.import because we
// are now in the browser without webpack. We need to be able to modify those packages without
// having to recompile the core-dashboard-worona package, so we can't use Webpack here.
export const requireRemotePackage = pkg => new Promise(resolve => {
  SystemJS.import(`https://cdn.worona.io/packages/${pkg.prod.main}`)
  .then(module => resolve(module));
});

// Function which is triggered each PACKAGES_DOWNLOAD_REQUESTED and dispatches individual
// PACKAGE_DOWNLOAD_REQUESTED.
export function* packagesDownloadSaga({ pkgs = [], uid }) {
  yield pkgs.map(pkg => put(actions.packageDownloadRequested({ pkg, uid })));
}

// Function triggered by PACKAGE_DOWNLOAD_REQUESTED and used to download each package/module
// and add it to the 'worona-deps' package. It contains the logic to use either
// requireLocalPackage or requireRemotePackage and dispatches PACKAGE_DOWNLOAD_SUCCED or
// PACKAGE_DOWNLOAD_FAILED if necessary.
export function* packageDownloadSaga({ pkg, uid }) {
  const requirePackage = requireLocalPackage; // (TODO) Add here logic for local/remote requires.
  try {
    const module = yield call(requirePackage, pkg);
    yield call(addPackage, pkg.namespace, module); // Adds the download module to worona-deps.
    yield put(actions.packageDownloadSucceed({ pkg, uid }));
  } catch (error) {
    yield put(actions.packageDownloadFailed({ error, pkg, uid }));
  }
}

// Function triggered by PACKAGES_DOWNLOAD_REQUESTED which creates an internal list of
// packages which need to be downloaded. Then, it listens to any PACKAGE_DOWNLOAD_SUCCEED
// and updates the list. Once the list is completed, it dispatches a PACKAGES_DOWNLOAD_SUCCEED.
// It also listens to any relevant PACKAGE_DOWNLOAD_FAILED and dispatch PACKAGES_DOWNLOAD_FAILED if
// any download fails.
export function* packagesDownloadWatcher({ pkgs = [], uid }) {
  const requested = pkgs.map(pkg => pkg.name);
  const downloaded = [];
  while (true) {
    const { succeed, failed } = yield race({
      succeed: types.PACKAGE_DOWNLOAD_SUCCEED,
      failed: types.PACKAGE_DOWNLOAD_FAILED,
    });
    if (succeed && succeed.uid === uid) {
      downloaded.push(succeed.pkg.name);
      if (_.isEqual(requested.sort(), downloaded.sort())) {
        // If both download and requested are equal, dispatch PACKAGES_DOWNLOAD_SUCCEED and exit.
        yield put(actions.packagesDownloadSucceed({ pkgs, uid }));
        break;
      }
    } else if (failed && failed.uid === uid) {
      yield put(actions.packagesDownloadFailed(failed));
      break;
    }
  }
}
