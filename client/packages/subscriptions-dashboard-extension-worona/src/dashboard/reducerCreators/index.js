import * as types from '../types';

const newItem = (id, fields) => Object.assign({}, { id }, fields);
const changeItem = (oldFields, newFields) => Object.assign({}, oldFields, newFields);

export const collectionCreator = collection => (state = [], action) => {
  if ((action.type === types.COLLECTION_MODIFIED) && (action.collection === collection)) {
    const { id, fields } = action;
    switch (action.event) {
      case 'added': {
        const index = state.map(item => item.id).indexOf(id);
        if (index === -1) return [...state, newItem(id, fields)];
        return state.map((item, i) => (i === index ? newItem(id, fields) : item));
      }
      case 'changed': {
        const index = state.map(item => item.id).indexOf(id);
        if (index === -1) return [...state, newItem(id, fields)];
        return state.map((item, i) => (i === index ? changeItem(item, fields) : item));
      }
      case 'removed':
        return state.filter(item => item.id !== id);
      default:
        return state;
    }
  }
  return state;
};

export const objectCreator = object => (state = {}, action) => {
  if ((action.type === types.COLLECTION_MODIFIED) && (action.collection === object)) {
    const { id, fields } = action;
    switch (action.event) {
      case 'added':
      case 'changed':
        return newItem(id, fields);
      case 'removed':
        return {};
      default:
        return state;
    }
  }
  return state;
};

export const isReadyCreator = subscription => (state = false, action) => {
  if (action.subscription === subscription) {
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
