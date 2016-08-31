/* eslint-disable no-constant-condition, no-undef */
import { put, call, race, take } from 'redux-saga/effects';
import { toArray, mapValues, reduce } from 'lodash';
import { takeEvery } from 'redux-saga';
import { addPackage } from 'worona-deps';
import * as types from '../types';
import * as actions from '../actions';

// Function used to require local packages. It uses a "require context" of webpack
// so webpack knows about the included packages and create the bundles. We use bundle-loader
// in the webpack config to separate the bundles.
export const requireLocalPackage = pkg => new Promise(resolve => {
  const pkgName = `${pkg.namespace}-dashboard-${pkg.type}`;
  const req = require(`../../../../${pkgName}-worona/src/index.js`);
  req(module => resolve(module));
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
export function* packagesDownloadSaga({ pkgs = {}, uid }) {
  yield toArray(pkgs).map(pkg => put(actions.packageDownloadRequested({ pkg, uid })));
}

// Function triggered by PACKAGE_DOWNLOAD_REQUESTED and used to download each package/module
// and add it to the 'worona-deps' package. It contains the logic to use either
// requireLocalPackage or requireRemotePackage and dispatches PACKAGE_DOWNLOAD_SUCCED or
// PACKAGE_DOWNLOAD_FAILED if necessary.
export function* packageDownloadSaga({ pkg, uid }) {
  const requirePackage = requireRemotePackage; // (TODO) Add here logic for local/remote requires.
  try {
    const module = yield call(requirePackage, pkg);
    yield call(addPackage, pkg.namespace, module); // Adds the download module to worona-deps.
    yield put(actions.packageDownloadSucceed({ pkg, uid }));
  } catch (error) {
    yield put(actions.packageDownloadFailed({ error: error.message, pkg, uid }));
  }
}

// Function triggered by PACKAGES_DOWNLOAD_REQUESTED which creates an internal list of
// packages which need to be downloaded. Then, it listens to any PACKAGE_DOWNLOAD_SUCCEED
// and updates the list. Once the list is completed, it dispatches a PACKAGES_DOWNLOAD_SUCCEED.
// It also listens to any relevant PACKAGE_DOWNLOAD_FAILED and dispatch PACKAGES_DOWNLOAD_FAILED if
// any download fails.
export function* packagesDownloadWatcher({ pkgs = {}, uid }) {
  const requested = mapValues(pkgs, () => false);
  while (true) {
    const { succeed, failed } = yield race({
      succeed: take(types.PACKAGE_DOWNLOAD_SUCCEED),
      failed: take(types.PACKAGE_DOWNLOAD_FAILED),
    });
    if (succeed && succeed.uid === uid) {
      requested[succeed.pkg.name] = true;
      if (reduce(requested, (acc, pkg) => acc && pkg, true)) {
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

export default function* sagas() {
  yield [
    takeEvery(types.PACKAGES_DOWNLOAD_REQUESTED, packagesDownloadWatcher),
    takeEvery(types.PACKAGES_DOWNLOAD_REQUESTED, packagesDownloadSaga),
    takeEvery(types.PACKAGE_DOWNLOAD_REQUESTED, packageDownloadSaga),
  ];
}
