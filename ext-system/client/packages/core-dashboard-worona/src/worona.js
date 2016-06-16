export const actions = {};
export const actiontypes = {};
export const selectors = {};
export const libs = {};
export const reducerCreators = {};
export const sagaCreators = {};
export const messages = {};

const worona = {
  actions,
  actiontypes,
  selectors,
  libs,
  reducerCreators,
  sagaCreators,
  messages,
};

export default worona;

if (typeof window !== 'undefined') window.worona = worona;
