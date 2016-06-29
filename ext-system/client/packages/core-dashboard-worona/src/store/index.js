import 'worona';
import { compose, createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import createReducers from './reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  createReducers(),
  compose(
    applyMiddleware(sagaMiddleware),
    typeof window !== 'undefined' && window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

sagaMiddleware.run(rootSaga);

export default store;

export function reloadReducers() {
  store.replaceReducer(createReducers());
}

export function loadSaga(saga) {
  sagaMiddleware.run(saga);
}

if (module.hot) {
  module.hot.accept('./reducers', () => {
    const next = require('./reducers').reducers;
    store.replaceReducer(next);
  });
  module.hot.decline('./sagas');
}
