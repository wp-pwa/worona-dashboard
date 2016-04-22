import { compose, createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import reducers from './reducers';
import sagas from './sagas';

export const store = createStore(
  reducers,
  compose(
    applyMiddleware(createSagaMiddleware(...sagas)),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

if (module.hot) {
  module.hot.accept('./reducers', () => {
    const next = require('./reducers').reducers;
    store.replaceReducer(next);
  });
  module.hot.accept('./sagas', () => {
    const next = require('./sagas').reducers;
    store.replaceReducer(next);
  });
}
