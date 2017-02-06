export const config = {
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
  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password.length < 8) {
    errors.password = messages.minChar(8);
  }
  return errors;
};
