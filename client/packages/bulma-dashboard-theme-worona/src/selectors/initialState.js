import * as deps from '../dependencies';
import { closeMobileMenu } from '../actions';

export const initialHeaderItems = [];

const closeMobileMenuAction = () => deps.store.dispatch(closeMobileMenu());

export const loggedInItems = [
  {
    name: 'Sites',
    type: 'button',
    url: 'sites',
    link: 'sites',
    icon: 'th',
    action: closeMobileMenuAction,
  },
  {
    name: 'Licenses',
    type: 'button',
    url: 'licenses',
    link: 'licenses',
    icon: 'sliders',
    action: closeMobileMenuAction,
  },
  {
    name: 'Profile',
    type: 'button',
    url: 'profile',
    link: 'profile',
    icon: 'user',
    action: closeMobileMenuAction,
  },
  {
    name: 'Logout',
    type: 'button',
    icon: 'power-off',
    action: () => deps.store.dispatch(deps.actions.logoutRequested()),
  },
];

export const defaultSettings = {
  settingCategories: ['Settings', 'Appeareance', 'Extensions', 'Publish'],
  settingMenuEntries: [
    {
      name: 'General',
      categoryName: 'Settings',
      target: 'general',
    },
    {
      name: 'Excludes',
      categoryName: 'Settings',
      target: 'excludes',
    },
    {
      name: 'Change Theme',
      categoryName: 'Appeareance',
      target: 'change-theme',
    },
    {
      name: 'Starter Theme',
      categoryName: 'Appeareance',
      target: 'current-theme',
    },
    {
      name: 'Add new',
      categoryName: 'Extensions',
      target: 'add-new-extension',
    },
    {
      name: 'Extension 1',
      categoryName: 'Extensions',
      target: 'extension-1',
    },
    {
      name: 'Extension 2',
      categoryName: 'Extensions',
      target: 'extension-2',
    },
    {
      name: 'Publish',
      categoryName: 'Publish',
      target: 'publish',
    },
  ],
};
