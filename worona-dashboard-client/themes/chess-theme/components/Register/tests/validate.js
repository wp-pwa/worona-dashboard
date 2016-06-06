import test from 'ava';
import { validate, messages, config } from '../validate';

test('email is required', t => {
  t.is(validate({ email: '' }).email, messages.required);
});

test('email should be valid', t => {
  t.is(validate({ email: 'aaaa' }).email, messages.invalidEmail);
  t.is(validate({ email: 'aaaa@' }).email, messages.invalidEmail);
  t.is(validate({ email: 'aaaa@aaaa' }).email, messages.invalidEmail);
  t.is(validate({ email: 'aaaa@aaaa.' }).email, messages.invalidEmail);
  t.is(validate({ email: 'aaaa@aaaa.c' }).email, messages.invalidEmail);
  t.is(validate({ email: 'aaaa@aaaa.com' }).email, undefined);
});

test('name is required', t => {
  t.is(validate({ name: '' }).name, messages.required);
});

test('name should have 15 char or less', t => {
  t.is(validate({ name: '123456789012345' }).name, undefined);
  t.is(validate({ name: '1234567890123456' }).name, messages.maxChar(config.nameMax));
});

test('password is required', t => {
  t.is(validate({ password: '' }).password, messages.required);
});

test('password should have 8 char or more', t => {
  t.is(validate({ password: '1234567' }).password, messages.minChar(config.passwordMin));
});

test('password should have 8 char or more', t => {
  t.is(validate({ password: '12345678' }).password, undefined);
});
