import { dep } from 'worona-deps';

export const elements = {
  get RootContainer() { return dep('theme', 'elements', 'RootContainer'); },
};
