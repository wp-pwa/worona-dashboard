import test from 'ava';
import * as a from '../actions';
import * as themes from '../reducers/themes';
import * as extensions from '../reducers/extensions';

test('themes.isLoading', t => {
  t.false(themes.isLoading(undefined, {}));
  t.true(themes.isLoading(false, a.themeLoadRequested()));
  t.false(themes.isLoading(true, a.themeLoadSucceed()));
  t.false(themes.isLoading(true, a.themeLoadFailed()));
});

test('themes.isReady', t => {
  t.false(themes.isReady(undefined, {}));
  t.true(themes.isReady(false, a.themeLoadSucceed()));
  t.false(themes.isReady(true, a.themeLoadRequested()));
});

test('extensions.isLoading', t => {
  t.false(extensions.isLoading(undefined, {}));
  t.true(extensions.isLoading(false, a.extensionLoadRequested()));
  t.false(extensions.isLoading(true, a.extensionLoadSucceed()));
  t.false(extensions.isLoading(true, a.extensionLoadFailed()));
});

test('extensions.isReady', t => {
  t.false(extensions.isReady(undefined, {}));
  t.true(extensions.isReady(false, a.extensionLoadSucceed()));
  t.false(extensions.isReady(true, a.extensionLoadRequested()));
});
