import test from 'ava';
import * as actions from '../actions';
import * as reducers from '../reducers';
import * as theme from '../reducers/theme';
import * as extensions from '../reducers/extensions';
import * as packages from '../reducers/packages';

test('isLoading', t => {
  t.false(reducers.isLoading(undefined, {}));
  t.true(reducers.isLoading(false, actions.packagesLoadRequested()));
  t.false(reducers.isLoading(true, actions.packagesLoadSucceed()));
  t.false(reducers.isLoading(true, actions.packagesLoadFailed()));
});

test('isReady', t => {
  t.false(reducers.isReady(undefined, {}));
  t.true(reducers.isReady(false, actions.packagesLoadSucceed()));
  t.false(reducers.isReady(true, actions.packagesLoadRequested()));
});

test('theme.isLoading', t => {
  t.false(theme.isLoading(undefined, {}));
  t.true(theme.isLoading(false, actions.themeLoadRequested()));
  t.false(theme.isLoading(true, actions.themeLoadSucceed()));
  t.false(theme.isLoading(true, actions.themeLoadFailed()));
});

test('theme.isReady', t => {
  t.false(theme.isReady(undefined, {}));
  t.true(theme.isReady(false, actions.themeLoadSucceed()));
  t.false(theme.isReady(true, actions.themeLoadRequested()));
});

test('extensions.isLoading', t => {
  t.false(extensions.isLoading(undefined, {}));
  t.true(extensions.isLoading(false, actions.extensionsLoadRequested()));
  t.false(extensions.isLoading(true, actions.extensionsLoadSucceed()));
  t.false(extensions.isLoading(true, actions.extensionsLoadFailed()));
});

test('extensions.isReady', t => {
  t.false(extensions.isReady(undefined, {}));
  t.true(extensions.isReady(false, actions.extensionsLoadSucceed()));
  t.false(extensions.isReady(true, actions.extensionsLoadRequested()));
});

test('packages.isDownloading', t => {
  t.false(packages.isDownloading(undefined, {}));
});
