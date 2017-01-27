import urlValidator from 'url-regexp';

export const config = { nameMax: 15 };

export const messages = {
  required: 'Required',
  maxChar: maxChar => `Must be ${maxChar} characters or less`,
  invalidUrl: 'Invalid url. It should be something like: http[s]://www.mydomain.com.',
};

export const validate = values => {
  const errors = {};
  if (!values.name) {
    errors.name = messages.required;
  } else if (values.name.length > config.nameMax) {
    errors.name = messages.maxChar(config.nameMax);
  }
  if (!values.url) {
    errors.url = messages.required;
  } else if (
    /localhost/.test(values.siteURL) &&
      !urlValidator.validate(values.url.match(/https?:\/\//) ? values.url : `http://${values.url}`)
  ) {
    errors.url = messages.invalidUrl;
  }
  return errors;
};
