import test from 'ava';
import { validate, messages, config } from '../validate';

test('url is required', t => {
  t.is(validate({ siteURL: '' }).siteURL, messages.required);
});

test('url should be valid', t => {
  t.is(validate({ siteURL: 'http' }).siteURL, messages.invalidUrl);
  t.is(validate({ siteURL: 'http://' }).siteURL, messages.invalidUrl);
  t.is(validate({ siteURL: 'http://domain' }).siteURL, messages.invalidUrl);
  t.is(validate({ siteURL: 'http://domain.' }).siteURL, messages.invalidUrl);
  t.is(validate({ siteURL: 'http://domain.c' }).siteURL, messages.invalidUrl);
  t.is(validate({ siteURL: 'http://domain.com' }).siteURL, undefined);
  t.is(validate({ siteURL: 'https://domain.com' }).siteURL, undefined);
  t.is(validate({ siteURL: 'https://domain.com/folder' }).siteURL, undefined);
  t.is(validate({ siteURL: 'https://sub.domain.com/folder' }).siteURL, undefined);
  t.is(validate({ siteURL: 'http://sub.domain.com/folder' }).siteURL, undefined);
  t.is(validate({ siteURL: 'http://sub.domain.com' }).siteURL, undefined);
  t.is(validate({ siteURL: 'http//sub.domain.com' }).siteURL, messages.invalidUrl);
});

test('siteName is required', t => {
  t.is(validate({ siteName: '' }).siteName, messages.required);
});

test('siteName should have 15 char or less', t => {
  t.is(validate({ siteName: '123456789012345' }).siteName, undefined);
  t.is(validate({ siteName: '1234567890123456' }).siteName, messages.maxChar(config.nameMax));
});
