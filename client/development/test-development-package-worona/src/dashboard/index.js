import * as reducers from './reducers';
import * as sagas from './sagas';

const name = 'test-development-package-worona';
const namespace = 'development';
const niceName = 'Test Development';

export default {
  name,
  namespace,
  niceName,
  reducers,
  sagas,
  isDev: true,
};
