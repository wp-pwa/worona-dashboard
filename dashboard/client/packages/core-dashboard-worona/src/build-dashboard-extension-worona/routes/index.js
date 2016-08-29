/* eslint-disable react/prefer-stateless-function, react/no-multi-comp, react/prop-types */
/* eslint-disable prefer-template, react/prefer-es6-class */
import React from 'react';
import { dep } from 'worona-deps';
import { connect } from 'react-redux';
import { Route, IndexRoute, IndexRedirect } from 'react-router';
import { theme } from '../selectors';

const mapStateToProps = state => ({
  theme: theme.requested(state),
});

class ThemeLoader extends React.Component {
  render() {
    const Theme = dep(this.props.theme, 'components', 'Theme');
    return <Theme {...this.props} />;
  }
}
ThemeLoader = connect(mapStateToProps)(ThemeLoader);

class Entry extends React.Component {
  render() {
    try {
      const Component = dep(this.props.theme, 'components', this.props.route.wrapped);
      return <Component {...this.props} />;
    } catch (error) {
      const Component = dep(this.props.theme, 'components', 'Home');
      return <Component {...this.props} />;
    }
  }
}
Entry = connect(mapStateToProps)(Entry);

const requireAuth = (store) => (nextState, replace) => {
  const accounts = store.getState().accounts;
  if (!accounts || !accounts.isLoggedIn) replace({ pathname: '/login' });
};

const dontRequireAuth = (store) => (nextState, replace) => {
  const accounts = store.getState().accounts;
  if (accounts && accounts.isLoggedIn) replace({ pathname: '/sites' });
};

export const routes = (store) => (
  <Route path="/" component={ThemeLoader} >
    <IndexRedirect to="login" />
    <Route path="login" component={Entry} wrapped="Login" onEnter={dontRequireAuth(store)} />
    <Route path="register" component={Entry} wrapped="Register" onEnter={dontRequireAuth(store)} />
    <Route path="add-site" component={Entry} wrapped="AddSite"
      onEnter={requireAuth(store)}
    />
    <Route path="profile" component={Entry} wrapped="Profile" onEnter={requireAuth(store)} />
    <Route path="sites" component={Entry} wrapped="Sites" onEnter={requireAuth(store)} />
    <Route path="site/:siteId" component={Entry} wrapped="SiteHome" onEnter={requireAuth(store)}>
      <IndexRoute component={Entry} wrapped="SitesEntry" />
    </Route>
  </Route>
);

export default routes;
