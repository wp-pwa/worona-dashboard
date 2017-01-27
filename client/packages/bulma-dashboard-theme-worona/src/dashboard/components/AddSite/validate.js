import urlValidator from 'url-regexp';

export const config = { nameMax: 15 };

export const messages = {
  required: 'Required',
  maxChar: maxChar => `Must be ${maxChar} characters or less`,
  invalidUrl: 'Invalid url. It should be something like: http[s]://www.mydomain.com.',
};

export const validate = values => {
  const errors = {};
  if (!values.siteName) {
    errors.siteName = messages.required;
  } else if (values.siteName.length > config.nameMax) {
    errors.siteName = messages.maxChar(config.nameMax);
  }
  if (!values.siteURL) {
    errors.siteURL = messages.required;
  } else if (
    /localhost/.test(values.siteURL) &&
      !urlValidator.validate(
        values.siteURL.match(/https?:\/\//) ? values.siteURL : `http://${values.siteURL}`,
      )
  ) {
    errors.siteURL = messages.invalidUrl;
  }
  return errors;
};
