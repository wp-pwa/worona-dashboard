/* eslint-disable react/prefer-stateless-function */
import 'babel-polyfill';
import worona from 'worona';
import React from 'react';
import ReactDOM from 'react-dom';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { I18nextProvider } from 'react-i18next';
import * as loading from './loading-dashboard-theme-worona';
import * as build from './build-dashboard-extension-worona';
import store from './store';
import i18n from './i18n-dashboard-extension-worona';
import routes from './router';
import FastClick from 'fastclick';

worona.build = build;
worona.loading = loading;

const history = syncHistoryWithStore(browserHistory, store);

class Dashboard extends React.Component {
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

if ('ontouchstart' in window) {
  window.addEventListener('load', () => FastClick.attach(document.body));
}

ReactDOM.render(
  <Dashboard />,
  document.getElementById('root')
);
