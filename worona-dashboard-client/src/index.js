/* eslint-disable react/prefer-stateless-function */
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import store from 'store';
import { routes } from 'router';
import FastClick from 'fastclick';

const history = syncHistoryWithStore(browserHistory, store);

class Dashboard extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history} routes={routes(store)} />
      </Provider>
    );
  }
}

ReactDOM.render(
  <Dashboard />,
  document.getElementById('root')
);

if ('ontouchstart' in window) {
  window.addEventListener('load', () => {
    FastClick.attach(document.body);
  });
}
