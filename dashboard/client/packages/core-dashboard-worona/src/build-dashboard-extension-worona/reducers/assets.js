import { combineReducers } from 'redux';
import { flow, filter, keyBy, mapValues } from 'lodash/fp';
import * as t from '../types';

const filterAssets = type => flow(
    filter(item => item.prod.assets && item.prod.assets[type]),
    keyBy(item => item.namespace),
    mapValues(item => item.prod.assets[type])
);

export const css = (state = {}, action) => {
  if (action.type === t.CORE_PACKAGES_SUCCEED) {
    const newCss = filterAssets('css')(action.pkgs);
    return Object.assign({}, state, newCss);
  }
  return state;
};

export default combineReducers({
  css,
});
