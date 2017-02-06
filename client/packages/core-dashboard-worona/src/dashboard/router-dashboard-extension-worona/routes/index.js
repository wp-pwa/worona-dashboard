/* eslint-disable react/prefer-stateless-function, react/no-multi-comp, react/prop-types */
/* eslint-disable prefer-template, react/prefer-es6-class, react/jsx-filename-extension */
import React from 'react';
import Helmet from 'react-helmet';
import { dep } from 'worona-deps';
import { connect } from 'react-redux';
import { Route, IndexRedirect, Redirect } from 'react-router';
import CssLoader from '../components/CssLoader';
import * as deps from '../deps';

const mapStateToProps = state => ({
  themeName: deps.selectors.getThemeName(state),
});

class ThemeLoaderClass extends React.Component {
  render() {
    const Theme = dep('theme', 'components', 'Theme');
    return (
      <div id="root">
        <CssLoader />
        <Theme {...this.props} />
        {this.props.children.props.route.title && (
          <Helmet title={`Worona Dashboard - ${this.props.children.props.route.title}`} />
        )}
      </div>
    );
  }
}
const ThemeLoader = connect(mapStateToProps)(ThemeLoaderClass);

class Entry extends React.Component {
  render() {
    try {
      const Component = dep('theme', 'components', this.props.route.wrapped);
      return <Component {...this.props} />;
    } catch (error) {
      const Component = dep('theme', 'components', 'Home');
      return <Component {...this.props} />;
    }
  }
}
// Entry = connect(mapStateToProps)(Entry);

const requireAuth = store => (nextState, replace) => {
  const accounts = store.getState().accounts;
  if (!accounts || !accounts.isLoggedIn) {
    replace({
      pathname: '/register',
      query: { ...nextState.location.query, next: nextState.location.pathname },
    });
  }
};

const dontRequireAuth = store => (nextState, replace) => {
  const accounts = store.getState().accounts;
  if (accounts && accounts.isLoggedIn) replace({ pathname: '/sites' });
};

export const routes = store => (
  <Route path="/" component={ThemeLoader}>
    <IndexRedirect to="/register" />
    <Route
      path="login"
      component={Entry}
      wrapped="Login"
      title="Login"
      onEnter={dontRequireAuth(store)}
    />
    <Route
      path="register"
      component={Entry}
      wrapped="Register"
      title="Register"
      onEnter={dontRequireAuth(store)}
    />
    <Route
      path="forgot-password"
      component={Entry}
      wrapped="ForgotPassword"
      title="Forgot Password"
      onEnter={dontRequireAuth(store)}
    />
    <Route
      path="recover-password"
      component={Entry}
      wrapped="RecoverPassword"
      title="Recover Password"
      onEnter={dontRequireAuth(store)}
    />
    <Route
      path="add-site"
      component={Entry}
      wrapped="AddSite"
      title="Add Site"
      onEnter={requireAuth(store)}
    />
    <Route
      path="check-site/:siteId"
      component={Entry}
      wrapped="CheckSite"
      title="Checking Site"
      onEnter={requireAuth(store)}
    />
    <Route
      path="edit-site/:siteId"
      component={Entry}
      wrapped="EditSite"
      title="Edit Site"
      onEnter={requireAuth(store)}
    />
    <Route
      path="sites"
      component={Entry}
      wrapped="Sites"
      title="Sites"
      onEnter={requireAuth(store)}
    />
    <Redirect from="/site/:siteId" to="/site/:siteId/app" />
    <Redirect from="/site/:siteId/app" to="/site/:siteId/app/general-app-extension-worona" />
    <Redirect from="/site/:siteId/fbia" to="/site/:siteId/fbia/general-fbia-extension-worona" />
    <Redirect from="/site/:siteId/amp" to="/site/:siteId/amp/general-amp-extension-worona" />
    <Route
      path="/site/:siteId/:service/:packageName"
      component={Entry}
      wrapped="SiteHome"
      onEnter={requireAuth(store)}
    />
  </Route>
);

export default routes;
