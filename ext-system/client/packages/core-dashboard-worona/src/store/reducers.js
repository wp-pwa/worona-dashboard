import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import build from '../build-dashboard-extension-worona/reducers';

export default combineReducers({
  routing,
  build,
});
