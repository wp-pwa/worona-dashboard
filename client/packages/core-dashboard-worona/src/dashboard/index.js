/* eslint-disable react/prefer-stateless-function, camelcase, no-undef, import/imports-first,
  no-underscore-dangle, global-require, react/jsx-filename-extension */

__webpack_public_path__ = window.publicPath;

import 'worona-polyfills';
import { packageDownloaded, packageActivated } from 'worona-deps';

import * as loading from './loading-dashboard-theme-worona';
import * as build from './build-dashboard-extension-worona';
import * as router from './router-dashboard-extension-worona';

packageDownloaded(build, 'build-dashboard-extension-worona', 'build');
packageDownloaded(loading, 'loading-dashboard-theme-worona', 'theme');
packageDownloaded(router, 'router-dashboard-extension-worona', 'router');
packageActivated('build-dashboard-extension-worona');
packageActivated('loading-dashboard-theme-worona');
packageActivated('router-dashboard-extension-worona');

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import { store, startSaga } from './build-dashboard-extension-worona/store';
import i18n from './build-dashboard-extension-worona/i18n';
import FastClick from 'fastclick';
import { ReduxRouter } from 'redux-router';

class App extends React.Component {
  render() {
    return (
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <ReduxRouter routes={router.routes.default(store)} />
        </Provider>
      </I18nextProvider>
    );
  }
}

startSaga('build', build.sagas.default);
startSaga('router', router.sagas.default);

if ('ontouchstart' in window) {
  window.addEventListener('load', () => FastClick.attach(document.body));
}

ReactDOM.render(<App />, document.getElementById('root'));

if (module.hot) {
  module.hot.decline('./build-dashboard-extension-worona/sagas');
}
