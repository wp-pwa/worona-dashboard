export default {
  body: [
    {
      namespace: 'accounts',
      name: 'accounts-dashboard-extension-worona',
      dependencies: ['build', 'connection'],
      type: 'extension',
      prod: { assets: {} },
    },
    {
      namespace: 'connection',
      name: 'connection-dashboard-extension-worona',
      dependencies: [],
      type: 'extension',
      prod: { assets: {} },
    },
    {
      namespace: 'sites',
      name: 'sites-dashboard-extension-worona',
      dependencies: ['build', 'connection', 'subscriptions'],
      type: 'extension',
      prod: { assets: {} },
    },
    {
      namespace: 'subscriptions',
      name: 'subscriptions-dashboard-extension-worona',
      dependencies: ['connection', 'accounts'],
      type: 'extension',
      prod: { assets: {} },
    },
    {
      namespace: 'settings',
      name: 'settings-dashboard-extension-worona',
      dependencies: ['subscriptions'],
      type: 'extension',
      prod: { assets: {} },
    },
    {
      namespace: 'theme',
      name: 'bulma-dashboard-theme-worona',
      dependencies: ['build', 'accounts', 'sites'],
      type: 'theme',
      prod: { assets: {} },
    },
  ],
};
