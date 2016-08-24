import * as deps from '../dependencies';

export const initialHeaderItems = [];

export const loggedInItems = [
  {
    name: 'Sites',
    type: 'button',
    url: 'https://dashboard.worona.org/sites',
    icon: 'th',
    link: 'sites',
  },
  {
    name: 'Licenses',
    type: 'button',
    url: 'https://dashboard.worona.org/licenses',
    icon: 'sliders',
    link: 'licenses',
  },
  {
    name: 'Profile',
    type: 'button',
    url: 'https://dashboard.worona.org/profile',
    link: 'profile',
    icon: 'user',
  },
  {
    name: 'Logout',
    type: 'button',
    url: 'https://dashboard.worona.org',
    icon: 'power-off',
    action: () => deps.store.dispatch(deps.actions.logoutRequested()),
  },
];
