import worona from 'worona';
import { compose, createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import * as actions from './actions';
import * as actiontypes from './actiontypes';
import * as sagas from './sagas';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  combineReducers(worona.reducers),
  compose(
    applyMiddleware(sagaMiddleware),
    typeof window !== 'undefined' && window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

sagaMiddleware.run(sagas);

export default store;

export {
  actions,
  actiontypes,
  sagas,
};

if (module.hot) {
  module.hot.accept(() => {
    store.replaceReducer(combineReducers(worona.reducers));
  });
  module.hot.decline('./sagas');
}
