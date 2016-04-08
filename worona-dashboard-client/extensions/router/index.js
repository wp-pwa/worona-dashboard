/* eslint-disable react/prefer-stateless-function, react/no-multi-comp, react/prop-types */
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import {
  Theme,
  Home,
  Login,
  Register,
  Profile,
  Sites,
  Site,
  SiteHome,
} from 'Theme';

class ThemeEntry extends React.Component {
  render() { return <Theme children={this.props.children} />; }
}
class HomeEntry extends React.Component {
  render() { return <Home />; }
}
class LoginEntry extends React.Component {
  render() { return <Login />; }
}
class RegisterEntry extends React.Component {
  render() { return <Register />; }
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

export const routes = (store) => (
  <Route path="/" component={ThemeEntry} >
    <IndexRoute component={HomeEntry} onEnter={requireAuth(store)} />
    <Route path="login" component={LoginEntry} />
    <Route path="register" component={RegisterEntry} />
    <Route path="profile" component={ProfileEntry} onEnter={requireAuth(store)} />
    <Route path="sites" component={SitesEntry} onEnter={requireAuth(store)} />
    <Route path="site/:siteId" component={SiteEntry} onEnter={requireAuth(store)}>
      <IndexRoute component={SiteHomeEntry} />
    </Route>
  </Route>
);
