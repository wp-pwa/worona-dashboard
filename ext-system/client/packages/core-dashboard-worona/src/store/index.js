import worona from 'worona';
import { compose, createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
import { routerReducer as routing } from 'react-router-redux';
import * as loading from '../loading-dashboard-theme-worona';
import * as build from '../build-dashboard-extension-worona';

worona.build = build;
worona.loading = loading;
worona.reducers = {
  build: build.reducers.default,
  routing,
};

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  combineReducers(worona.reducers),
  compose(
    applyMiddleware(sagaMiddleware),
    typeof window !== 'undefined' && window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

export default store;

export function reloadReducers() {
  store.replaceReducer(combineReducers(worona.reducers));
}

export function loadSaga(saga) {
  sagaMiddleware.run(saga);
}

sagaMiddleware.run(rootSaga);

if (module.hot) {
  module.hot.accept('./reducers', () => {
    const next = require('./reducers').reducers;
    store.replaceReducer(next);
  });
  module.hot.decline('./sagas');
}
