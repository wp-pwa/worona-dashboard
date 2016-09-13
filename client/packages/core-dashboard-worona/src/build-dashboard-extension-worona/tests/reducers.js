import test from 'ava';
import * as actions from '../actions';
import * as theme from '../reducers/theme';

test('theme.requested', t => {
  t.is(theme.requested(undefined, {}), 'loading');
  const action = { name: 'test', uid: 1 };
  t.is(theme.requested('loading', actions.themeChangeRequested(action)), 'test');
});

test('theme.downloaded', t => {
  t.deepEqual(theme.downloaded(undefined, {}), []);
  const action = { name: 'test', uid: 1 };
  t.deepEqual(theme.downloaded([], actions.themeDownloadSucceed(action)), ['test']);
});

test('theme.current', t => {
  t.is(theme.current(undefined, {}), 'loading');
  const action = { name: 'test', uid: 1 };
  t.is(theme.current('loading', actions.themeChangeSucceed(action)), 'test');
});
