import * as deps from '../deps';

export const createAccount = (name, email, password, api = deps.libs.call) =>
  api('createAccount', name, email, password);
