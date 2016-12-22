import 'worona-polyfills';
import { packageDevelopment } from 'worona-deps';
import pkgJson from './test-development-package-worona/package.json';
import * as pkg from './test-development-package-worona/src/dashboard';

packageDevelopment({
  woronaInfo: { ...pkgJson.worona, name: pkgJson.name },
  ...pkg,
}, pkgJson.name, pkgJson.worona.dashboard.namespace);

console.log('test-development-package-worona loaded!');
