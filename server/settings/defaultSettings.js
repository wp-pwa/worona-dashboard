const defaults = [
  {
    woronaInfo: {
      name: 'general-app-extension-worona',
      namespace: 'generalApp',
      active: true,
      init: false,
    },
  },
  {
    woronaInfo: {
      name: 'publish-native-app-extension-worona',
      namespace: 'publishNative',
      active: true,
      init: false,
    },
  },
];

if (process.env.NODE_ENV === 'development') {
  defaults.push({
    woronaInfo: {
      name: 'test-development-package-worona',
      namespace: 'development',
      active: true,
      init: false,
    },
  });
}

export default defaults;
