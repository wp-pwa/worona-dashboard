import { dep } from 'worona-deps';

export const selectors = {
  get getSite() { return dep('sites', 'selectors', 'getSite'); },
  get getSelectedSite() { return dep('sites', 'selectors', 'getSelectedSite'); },
  get getNameAndEmail() { return dep('profile', 'selectors', 'getNameAndEmail'); },
};
