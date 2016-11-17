import * as types from '../types';

const newItem = (id, fields) => ({ ...fields, id });
const changeItem = (oldFields, newFields) => ({ ...oldFields, ...newFields });

export const collectionCreator = (collection, map = f => f) => (state = [], action) => {
  if ((action.type === types.SUBSCRIPTION_MODIFIED) && (action.collection === collection)) {
    const { id, fields } = action;
    switch (action.event) {
      case 'added': {
        const index = state.map(item => item.id).indexOf(id);
        if (index === -1) return [...state, newItem(id, map(fields))];
        return state.map((item, i) => (i === index ? newItem(id, map(fields)) : item)); }
      case 'changed':
        return state.map(item => (item.id === id ? changeItem(item, map(fields)) : item));
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
