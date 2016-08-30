/* eslint-disable react/prefer-stateless-function, react/no-multi-comp, react/prop-types */
/* eslint-disable prefer-template, react/prefer-es6-class */
import React from 'react';
import { dep } from 'worona-deps';
import { connect } from 'react-redux';
import { Route, IndexRoute, IndexRedirect } from 'react-router';
import { theme, packages } from '../selectors';

const mapStateToProps = (state) => {
  const newTheme = theme.isLoading(state);
  const props = {
    theme: newTheme.namespace,
  };
  const packageTheme = packages(state)[newTheme.name];
  if (packageTheme && packageTheme.prod && packageTheme.prod.assets &&
    packageTheme.prod.assets.css) {
    props.css = packageTheme.prod.assets.css;
  }
  return props;
};

class StyleLoader extends React.Component {
  componentDidMount() {
    this.refs.link.addEventListener('load', () => alert('loaded!'));
  }
  render() {
    return (
      <link rel="stylesheet" ref="link" type="text/css" href={this.props.cssPath} />
    );
  }
}

class ThemeLoader extends React.Component {
  render() {
    const css = this.props.css || [];
    const cdn = 'https://cdn.worona.io/packages/';
    const Theme = dep(this.props.theme, 'components', 'Theme');
    return (
      <div id="root">
        {css.map(cssPath => <StyleLoader cssPath={cdn + cssPath} key={cssPath} />)}
        <Theme {...this.props} />;
      </div>
    );
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
