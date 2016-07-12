import { getReducers } from 'worona-deps';
import { compose, createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { routerReducer as routing } from 'react-router-redux';
import { default as build } from '../reducers';

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  combineReducers({ build: build(), routing }),
  compose(
    applyMiddleware(sagaMiddleware),
    typeof window !== 'undefined' && window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);
export default store;

export const dispatch = action => store.dispatch(action);
export const reloadReducers = () => store.replaceReducer(combineReducers(getReducers()));
export const runSaga = saga => sagaMiddleware.run(saga);

if (module.hot) {
  module.hot.accept(() => {
    reloadReducers();
  });
}
