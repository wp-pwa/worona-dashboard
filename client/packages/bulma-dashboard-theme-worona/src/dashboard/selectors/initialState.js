import * as deps from '../deps';
import { closeMobileMenu } from '../actions';

export const initialHeaderItems = [];

const closeMobileMenuAction = () => deps.store.dispatch(closeMobileMenu());

export const loggedInItems = [
  {
    name: 'Sites',
    type: 'button',
    url: 'sites',
    link: '/sites',
    icon: 'th',
    action: closeMobileMenuAction,
  },
  /*
  {
    name: 'Licenses',
    type: 'button',
    url: 'licenses',
    link: '/licenses',
    icon: 'list-ul',
    action: closeMobileMenuAction,
  },
  {
    name: 'Profile',
    type: 'button',
    url: 'profile',
    link: '/profile',
    icon: 'user',
    action: closeMobileMenuAction,
  },
  */
  {
    name: 'Logout',
    type: 'button',
    icon: 'power-off',
    action: () => deps.store.dispatch(deps.actions.logoutRequested()),
  },
];
