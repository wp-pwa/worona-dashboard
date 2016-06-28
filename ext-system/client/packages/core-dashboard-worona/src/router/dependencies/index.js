import worona from 'worona';

module.exports = {
  get themeName() { return worona.build.selectors.theme.name; },
};
