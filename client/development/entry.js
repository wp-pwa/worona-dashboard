import 'worona-polyfills';
import { packageDevelopment } from 'worona-deps';
import pkg from './test-development-package-worona/src/dashboard';
import pkgJson from './test-development-package-worona/package.json';

packageDevelopment({
  name: pkgJson.name,
  namespace: pkgJson.worona.namespace,
  woronaInfo: {
    name: pkgJson.name,
    id: pkgJson.name,
    namespace: pkgJson.worona.namespace,
    niceName: pkgJson.worona.niceName,
    type: pkgJson.worona.type,
    menu: {
      category: 'Development',
      order: 10,
    },
  },
  ...pkg,
});

console.log('test-development-package-worona loaded!');
