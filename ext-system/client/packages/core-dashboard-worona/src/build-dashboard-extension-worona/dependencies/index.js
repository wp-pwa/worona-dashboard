import worona from 'worona';

module.exports = {
  get reloadReducersRequested() { return worona.store.actions.reloadReducersRequested; },
};
