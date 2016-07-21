import findIndex from 'lodash/findIndex';
import * as types from '../types';

const newItem = (id, fields) => Object.assign({}, { id }, fields);
const changeItem = (oldFields, newFields) => Object.assign({}, oldFields, newFields);

export const collectionCreator = collection => (state = [], action) => {
  if ((action.type === types.SUBSCRIPTION_MODIFIED) && (action.collection === collection)) {
    const { id, fields } = action;
    switch (action.event) {
      case 'added': {
        const index = findIndex(state, { id });
        if (index === -1) return [...state, newItem(id, fields)];
        return state.map((item, i) => (i === index ? newItem(id, fields) : item)); }
      case 'changed':
        return state.map(item => (item.id === id ? changeItem(item, fields) : item));
      case 'removed':
        return state.filter(item => item.id !== id);
      default:
        return state;
    }
  }
  return state;
};

export const isReadyCreator = collection => (state = false, action) => {
  if (action.collection === collection) {
    switch (action.type) {
      case types.SUBSCRIPTION_READY:
        return true;
      case types.SUBSCRIPTION_STOPPED:
        return false;
      default:
        return state;
    }
  }
  return state;
};
