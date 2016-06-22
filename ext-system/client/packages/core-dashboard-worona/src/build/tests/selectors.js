import test from 'ava';
import * as selectors from '../selectors';

test('isLoading', t => {
  const state = { build: { themes: { isLoading: false }, extensions: { isLoading: false } } };
  t.false(selectors.isLoading(state));
  state.build.themes.isLoading = true;
  t.false(selectors.isLoading(state));
  state.build.extensions.isLoading = true;
  t.true(selectors.isLoading(state));
  state.build.themes.isLoading = false;
  t.false(selectors.isLoading(state));
});

test('isReady', t => {
  const state = { build: { themes: { isReady: false }, extensions: { isReady: false } } };
  t.false(selectors.isReady(state));
  state.build.themes.isReady = true;
  t.false(selectors.isReady(state));
  state.build.extensions.isReady = true;
  t.true(selectors.isReady(state));
  state.build.themes.isReady = false;
  t.false(selectors.isReady(state));
});
