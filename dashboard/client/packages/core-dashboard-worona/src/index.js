/* eslint-disable react/prefer-stateless-function, camelcase, no-undef */
__webpack_public_path__ = window.publicPath;

import 'babel-polyfill';
import { addPackage } from 'worona-deps';

import * as loading from './loading-dashboard-theme-worona';
import * as build from './build-dashboard-extension-worona';
import * as routing from './routing-dashboard-extension-worona';

addPackage(build);
addPackage(loading);
addPackage(routing);

import React from 'react';
import ReactDOM from 'react-dom';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { I18nextProvider } from 'react-i18next';
import { store, startSaga } from './build-dashboard-extension-worona/store';
import sagas from './build-dashboard-extension-worona/sagas';
import routes from './routing-dashboard-extension-worona/routes';
import i18n from './build-dashboard-extension-worona/i18n';
import FastClick from 'fastclick';

const history = syncHistoryWithStore(browserHistory, store);

class App extends React.Component {
  render() {
    return (
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <Router history={history} routes={routes(store)} />
        </Provider>
      </I18nextProvider>
    );
  }
}

startSaga('build', sagas);

if ('ontouchstart' in window) {
  window.addEventListener('load', () => FastClick.attach(document.body));
}

ReactDOM.render(<App />, document.getElementById('root'));

if (module.hot) {
  module.hot.decline('./build-dashboard-extension-worona/sagas');
}
