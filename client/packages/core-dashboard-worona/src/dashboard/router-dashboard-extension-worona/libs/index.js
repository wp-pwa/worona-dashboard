import * as deps from '../deps';

export const push = (...args) => deps.store.history.push(...args);
export const replace = (...args) => deps.store.history.replace(...args);
export const go = (...args) => deps.store.history.go(...args);
export const goBack = (...args) => deps.store.history.goBack(...args);
export const goForward = (...args) => deps.store.history.goForward(...args);
