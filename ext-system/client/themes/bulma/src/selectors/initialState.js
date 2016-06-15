import { logoutRequested } from '../dependencies';
import store from 'store';

export const initialHeaderItems = [
  {
    name: 'Website',
    type: 'text',
    url: 'https://www.worona.org',
  },
  {
    name: 'Documentation',
    type: 'text',
    url: 'https://docs.worona.org',
    target: '_blank',
  },
  {
    name: 'Forums',
    type: 'text',
    url: 'https://forums.worona.org',
    target: '_blank',
  },
  {
    name: 'Support',
    type: 'text',
    url: 'https://support.worona.org',
    target: '_blank',
  },
];

export const loggedInItems = [
  {
    name: 'Edit profile',
    type: 'text',
    link: 'profile',
  },
  {
    name: 'Logout',
    type: 'button',
    icon: 'sign-out',
    action: () => store.dispatch(logoutRequested()),
  },
];
