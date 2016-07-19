/* eslint-disable react/prefer-stateless-function, camelcase, no-undef */
__webpack_public_path__ = window.publicPath;

import 'babel-polyfill';
import { addPackage } from 'worona-deps';
import { routerReducer as routing } from 'react-router-redux';
import * as loading from './loading-dashboard-theme-worona';
import * as build from './build-dashboard-extension-worona';

addPackage('build', build);
addPackage('loading', loading);
addPackage('routing', { reducers: { default: () => routing } });

import React from 'react';
import ReactDOM from 'react-dom';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { I18nextProvider } from 'react-i18next';
import { store, runSaga } from './build-dashboard-extension-worona/store';
import sagas from './build-dashboard-extension-worona/sagas';
import { routes } from './build-dashboard-extension-worona/routes';
import i18next from './i18n-dashboard-extension-worona/i18n';
import FastClick from 'fastclick';

const history = syncHistoryWithStore(browserHistory, store);

class App extends React.Component {
  render() {
    return (
      <I18nextProvider i18n={i18next}>
        <Provider store={store}>
          <Router history={history} routes={routes(store)} />
        </Provider>
      </I18nextProvider>
    );
  }
}

runSaga(sagas);

if ('ontouchstart' in window) {
  window.addEventListener('load', () => FastClick.attach(document.body));
}

ReactDOM.render(<App />, document.getElementById('root'));

if (module.hot) {
  module.hot.decline('./build-dashboard-extension-worona/sagas');
}
