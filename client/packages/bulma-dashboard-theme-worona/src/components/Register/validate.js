export const config = {
  nameMax: 15,
  passwordMin: 8,
};

export const messages = {
  required: 'Required',
  minChar: minChar => `Must be ${minChar} characters or more`,
  maxChar: maxChar => `Must be ${maxChar} characters or less`,
  invalidEmail: 'Invalid email address',
};

export const validate = values => {
  const errors = {};
  if (!values.name) {
    errors.name = messages.required;
  } else if (values.name.length > 15) {
    errors.name = messages.maxChar(15);
  }
  if (!values.email) {
    errors.email = messages.required;
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,8}$/i.test(values.email)) {
    errors.email = messages.invalidEmail;
  }
  if (!values.password) {
    errors.password = messages.required;
  } else if (values.password.length < 8) {
    errors.password = messages.minChar(8);
  }
  return errors;
};
