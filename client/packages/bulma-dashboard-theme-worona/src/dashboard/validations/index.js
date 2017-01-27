import urlValidator from 'url-regexp';

export const config = { nameMax: 15 };

export const messages = {
  required: 'Required',
  maxChar: maxChar => `Must be ${maxChar} characters or less`,
  invalidUrl: 'Invalid url. It should be something like: http[s]://www.mydomain.com.',
};

export const siteNameAndUrlValidator = values => {
  const errors = {};
  if (!values.siteName) {
    errors.siteName = messages.required;
  } else if (values.siteName.length > config.nameMax) {
    errors.siteName = messages.maxChar(config.nameMax);
  }
  if (!values.siteUrl) {
    errors.siteUrl = messages.required;
  } else if (
      !urlValidator.validate(
        values.siteUrl.match(/https?:\/\//) ? values.siteUrl : `http://${values.siteUrl}`,
      ) && !/localhost/.test(values.siteUrl)
  ) {
    errors.siteUrl = messages.invalidUrl;
  }
  return errors;
};
