import { call } from '../dependencies';

export const createAccount = (name, email, password, api = call) =>
  api('createAccount', name, email, password);
