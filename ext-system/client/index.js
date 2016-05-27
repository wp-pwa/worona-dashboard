/* eslint-disable react/prefer-stateless-function */
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
// import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
// import { Router, browserHistory } from 'react-router';
import { I18nextProvider } from 'react-i18next';
import store from './includes/store';
import i18n from './includes/i18n';
// import routes from './themes/base/routes';
import FastClick from 'fastclick';
import Loading from './includes/components/Loading';

// const history = syncHistoryWithStore(browserHistory, store);

class Dashboard extends React.Component {
  render() {
    return (
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <Loading />
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
