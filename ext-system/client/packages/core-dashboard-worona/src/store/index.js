import 'worona';
import { compose, createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import reducers from './reducers';
import rootSaga from './sagas';

const sageMiddleware = createSagaMiddleware();

const store = createStore(
  reducers,
  compose(
    applyMiddleware(sageMiddleware),
    typeof window !== 'undefined' && window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

sageMiddleware.run(rootSaga);

export default store;

if (module.hot) {
  module.hot.accept('./reducers', () => {
    const next = require('./reducers').reducers;
    store.replaceReducer(next);
  });
  module.hot.decline('./sagas');
}
