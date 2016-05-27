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

test('themes.isLoaded', t => {
  t.false(themes.isLoaded(undefined, {}));
  t.true(themes.isLoaded(false, a.themeLoadSucceed()));
  t.false(themes.isLoaded(true, a.themeLoadRequested()));
});

test('extensions.isLoading', t => {
  t.false(extensions.isLoading(undefined, {}));
  t.true(extensions.isLoading(false, a.extensionLoadRequested()));
  t.false(extensions.isLoading(true, a.extensionLoadSucceed()));
  t.false(extensions.isLoading(true, a.extensionLoadFailed()));
});

test('extensions.isLoaded', t => {
  t.false(extensions.isLoaded(undefined, {}));
  t.true(extensions.isLoaded(false, a.extensionLoadSucceed()));
  t.false(extensions.isLoaded(true, a.extensionLoadRequested()));
});
