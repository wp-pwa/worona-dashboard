import { getReducers } from 'worona-deps';
import { compose, createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { routerReducer as routing } from 'react-router-redux';
import { default as build } from '../reducers';
import sagas from '../sagas';

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  combineReducers({ build, routing }),
  compose(
    applyMiddleware(sagaMiddleware),
    typeof window !== 'undefined' && window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);
export default store;

export const dispatch = action => store.dispatch(action);
export const replaceReducer = reducers => store.replaceReducer(combineReducers(reducers));
export const runSaga = saga => sagaMiddleware.run(saga);

runSaga(sagas);

if (module.hot) {
  module.hot.accept(() => {
    replaceReducer(getReducers());
  });
  module.hot.decline('../sagas');
}
