import * as deps from '../dependencies';

export const createAccount = (name, email, password, api = deps.libs.call) =>
  api('createAccount', name, email, password);
