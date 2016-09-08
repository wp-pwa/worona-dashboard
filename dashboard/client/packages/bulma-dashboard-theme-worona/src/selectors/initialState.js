import * as deps from '../dependencies';

export const initialHeaderItems = [];

export const loggedInItems = [
  {
    name: 'Sites',
    type: 'button',
    url: 'sites',
    link: 'sites',
    icon: 'th',
  },
  {
    name: 'Licenses',
    type: 'button',
    url: 'licenses',
    link: 'licenses',
    icon: 'sliders',
  },
  {
    name: 'Profile',
    type: 'button',
    url: 'profile',
    link: 'profile',
    icon: 'user',
  },
  {
    name: 'Logout',
    type: 'button',
    icon: 'power-off',
    action: () => deps.store.dispatch(deps.actions.logoutRequested()),
  },
];
