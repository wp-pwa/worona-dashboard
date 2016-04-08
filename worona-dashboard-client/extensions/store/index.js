import { compose, createStore } from 'redux';
import { reducers } from './reducers';

export const store = createStore(reducers, {}, compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

if (module.hot) {
  module.hot.accept('./reducers', () => {
    const next = require('./reducers').reducers;
    store.replaceReducer(next);
  });
}
