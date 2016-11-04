import 'worona-polyfills';
import { packageDevelopment } from 'worona-deps';
import pkg from './test-development-package-worona/src/dashboard';

packageDevelopment(pkg);

console.log('test-development-package-worona loaded!');
