import { dep } from 'worona-deps';

export const types = {
  get ROUTER_DID_CHANGE() { return dep('router', 'types', 'ROUTER_DID_CHANGE'); },
};

export const selectors = {
  get getSelectedService() { return dep('router', 'selectors', 'getSelectedService'); },
  get getSelectedPackageName() { return dep('router', 'selectors', 'getSelectedPackageName'); },
  get getPathname() { return dep('router', 'selectors', 'getPathname'); },
};
