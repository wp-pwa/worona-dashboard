/* eslint-disable react/prefer-stateless-function, react/no-multi-comp, react/prop-types */
/* eslint-disable prefer-template, react/prefer-es6-class */
import React from 'react';
import worona from 'worona';
import { connect } from 'react-redux';
import { Route, IndexRoute, IndexRedirect } from 'react-router';
import { themeName } from './dependencies';

const addClass = Component => React.createClass({
  render() { return <Component {...this.props} />; },
});

const mapStateToProps = state => ({
  name: themeName(state),
});

class Theme extends React.Component {
  render() {
    const Header = addClass(worona[this.props.name].components.Header);
    const Footer = addClass(worona[this.props.name].components.Footer);
    return (
      <div>
        <Header />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}
Theme = connect(mapStateToProps)(Theme);

class Entry extends React.Component {
  render() {
    const Component = addClass(worona[this.props.name].components[this.props.route.wrapped]);
    return <Component {...this.props} />;
  }
}
Entry = connect(mapStateToProps)(Entry);

const requireAuth = (store) => (nextState, replace) => {
  const accounts = store.getState().accounts;
  if (accounts && !accounts.isLoggedIn) replace({ pathname: '/login' });
};

const dontRequireAuth = (store) => (nextState, replace) => {
  const accounts = store.getState().accounts;
  if (accounts && accounts.isLoggedIn) replace({ pathname: '/' });
};

export const routes = (store) => (
  <Route path="/" component={Theme} >
    <IndexRoute component={Entry} wrapped="Home" />
    <Route path="login" component={Entry} wrapped="Login" onEnter={dontRequireAuth(store)} />
    <Route path="register" component={Entry} wrapped="Register" onEnter={dontRequireAuth(store)} />
    <Route path="create-first-app" component={Entry} wrapped="CreateFirstApp"
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
