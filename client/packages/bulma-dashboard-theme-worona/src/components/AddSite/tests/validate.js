import test from 'ava';
import { validate, messages, config } from '../validate';

test('url is required', t => {
  t.is(validate({ url: '' }).url, messages.required);
});

test('url should be valid', t => {
  t.is(validate({ url: 'http' }).url, messages.invalidUrl);
  t.is(validate({ url: 'http://' }).url, messages.invalidUrl);
  t.is(validate({ url: 'http://domain' }).url, messages.invalidUrl);
  t.is(validate({ url: 'http://domain.' }).url, messages.invalidUrl);
  t.is(validate({ url: 'http://domain.c' }).url, messages.invalidUrl);
  t.is(validate({ url: 'http://domain.com' }).url, undefined);
  t.is(validate({ url: 'https://domain.com' }).url, undefined);
  t.is(validate({ url: 'https://domain.com/folder' }).url, undefined);
  t.is(validate({ url: 'https://sub.domain.com/folder' }).url, undefined);
  t.is(validate({ url: 'http://sub.domain.com/folder' }).url, undefined);
  t.is(validate({ url: 'http://sub.domain.com' }).url, undefined);
  t.is(validate({ url: 'http//sub.domain.com' }).url, messages.invalidUrl);
});

test('title is required', t => {
  t.is(validate({ title: '' }).title, messages.required);
});

test('title should have 15 char or less', t => {
  t.is(validate({ title: '123456789012345' }).title, undefined);
  t.is(validate({ title: '1234567890123456' }).title, messages.maxChar(config.titleMax));
});
