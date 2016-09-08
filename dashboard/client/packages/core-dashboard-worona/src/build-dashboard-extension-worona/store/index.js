import { compose, createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { routerReducer as routing } from 'react-router-redux';
import { default as build } from '../reducers';

const sagaMiddleware = createSagaMiddleware();

const reducers = { build: build(), routing };
const sagas = {};

export const store = createStore(
  combineReducers(reducers),
  compose(
    applyMiddleware(sagaMiddleware),
    typeof window !== 'undefined' && window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);
export default store;

export const dispatch = action => store.dispatch(action);
export const reloadReducers = () => store.replaceReducer(combineReducers(reducers));
export const addReducer = (namespace, reducer) => { if (reducer) reducers[namespace] = reducer; };
export const removeReducer = namespace => { if (reducers[namespace]) delete reducers[namespace]; };
export const startSaga = (namespace, saga) => { sagas[namespace] = sagaMiddleware.run(saga); };
export const stopSaga = (namespace) => { if (sagas[namespace]) sagas[namespace].cancel(); };
export const getState = store.getState.bind(store);

if (module.hot) {
  module.hot.accept(() => {
    reloadReducers();
  });
}
