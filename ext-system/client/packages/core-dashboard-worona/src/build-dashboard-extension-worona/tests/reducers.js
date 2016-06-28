import test from 'ava';
import * as a from '../actions';
import * as reducers from '../reducers';
import * as theme from '../reducers/theme';
import * as extensions from '../reducers/extensions';

test('isLoading', t => {
  t.false(reducers.isLoading(undefined, {}));
  t.true(reducers.isLoading(false, a.packagesLoadRequested()));
  t.false(reducers.isLoading(true, a.packagesLoadSucceed()));
  t.false(reducers.isLoading(true, a.packagesLoadFailed()));
});

test('isReady', t => {
  t.false(reducers.isReady(undefined, {}));
  t.true(reducers.isReady(false, a.packagesLoadSucceed()));
  t.false(reducers.isReady(true, a.packagesLoadRequested()));
});

test('theme.isLoading', t => {
  t.false(theme.isLoading(undefined, {}));
  t.true(theme.isLoading(false, a.themeLoadRequested()));
  t.false(theme.isLoading(true, a.themeLoadSucceed()));
  t.false(theme.isLoading(true, a.themeLoadFailed()));
});

test('theme.isReady', t => {
  t.false(theme.isReady(undefined, {}));
  t.true(theme.isReady(false, a.themeLoadSucceed()));
  t.false(theme.isReady(true, a.themeLoadRequested()));
});

test('extensions.isLoading', t => {
  t.false(extensions.isLoading(undefined, {}));
  t.true(extensions.isLoading(false, a.extensionsLoadRequested()));
  t.false(extensions.isLoading(true, a.extensionsLoadSucceed()));
  t.false(extensions.isLoading(true, a.extensionsLoadFailed()));
});

test('extensions.isReady', t => {
  t.false(extensions.isReady(undefined, {}));
  t.true(extensions.isReady(false, a.extensionsLoadSucceed()));
  t.false(extensions.isReady(true, a.extensionsLoadRequested()));
});
