/* eslint-disable react/prefer-stateless-function, react/no-multi-comp, react/prop-types */
/* eslint-disable prefer-template */
import React from 'react';
import { Route, IndexRoute, IndexRedirect } from 'react-router';
import themes from '../themes.json';

const loadTheme = require('bundle?name=theme!../' + themes[0] + '/theme.js');

loadTheme(theme => {
  const {
    Theme,
    Login,
    Register,
    CreateFirstApp,
    Profile,
    Sites,
    Site,
    SiteHome,
  } = theme;
});

class ThemeEntry extends React.Component {
  render() { return <Theme children={this.props.children} />; }
}
class LoginEntry extends React.Component {
  render() { return <Login />; }
}
class RegisterEntry extends React.Component {
  render() { return <Register />; }
}
class CreateFirstAppEntry extends React.Component {
  render() { return <CreateFirstApp />; }
}
class ProfileEntry extends React.Component {
  render() { return <Profile />; }
}
class SitesEntry extends React.Component {
  render() { return <Sites />; }
}
class SiteEntry extends React.Component {
  render() { return <Site />; }
}
class SiteHomeEntry extends React.Component {
  render() { return <SiteHome />; }
}

const requireAuth = (store) => (nextState, replace) => {
  const { isLoggedIn } = store.getState().accounts;
  if (!isLoggedIn) {
    replace({ pathname: '/login' });
  }
};

const dontRequireAuth = (store) => (nextState, replace) => {
  const { isLoggedIn } = store.getState().accounts;
  if (isLoggedIn) {
    replace({ pathname: '/' });
  }
};

export const routes = (store) => (
  <Route path="/" component={ThemeEntry} >
    <IndexRedirect to="sites" />
    <Route path="login" component={LoginEntry} onEnter={dontRequireAuth(store)} />
    <Route path="register" component={RegisterEntry} onEnter={dontRequireAuth(store)} />
    <Route path="create-first-app" component={CreateFirstAppEntry} onEnter={requireAuth(store)} />
    <Route path="profile" component={ProfileEntry} onEnter={requireAuth(store)} />
    <Route path="sites" component={SitesEntry} onEnter={requireAuth(store)} />
    <Route path="site/:siteId" component={SiteEntry} onEnter={requireAuth(store)}>
      <IndexRoute component={SiteHomeEntry} />
    </Route>
  </Route>
);

export default routes;
