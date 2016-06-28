import worona from 'worona';

module.exports = {
  get isReady() { return worona.build.selectors.isReady; },
  get isLoading() { return worona.build.selectors.isLoading; },
};
