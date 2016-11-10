import { dep } from 'worona-deps';

export const selectors = {
  get getSite() { return dep('sites', 'selectors', 'getSite'); },
  get getNameAndEmail() { return dep('profile', 'selectors', 'getNameAndEmail'); },
};
