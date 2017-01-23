import * as deps from '../deps';
import { closeMobileMenu } from '../actions';

const closeMobileMenuAction = () => deps.store.dispatch(closeMobileMenu());

export const initialHeaderItems = [
  {
    name: 'Get Help',
    type: 'button',
    url: 'https://www.worona.org/get-help',
    target: '_blank',
    icon: 'question-circle',
    action: closeMobileMenuAction,
  },
];

export const loggedInItems = [
  {
    name: 'Sites',
    type: 'button',
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
