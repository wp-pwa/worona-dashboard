import test from 'ava';
import { put, call } from 'redux-saga/effects';
import * as a from '../actions';
import { requirePackage, loadExtension, loadTheme } from '../sagas';

test('loadExtension succeed', t => {
  const gen = loadExtension('test');
  t.deepEqual(gen.next().value, put(a.extensionLoadRequested('test')));
  t.deepEqual(gen.next().value, call(requirePackage, 'test-dashboard-extension'));
  t.deepEqual(gen.next().value, put(a.extensionLoadSucceed('test')));
});

test('loadExtension failed', t => {
  const gen = loadExtension('test');
  t.deepEqual(gen.next().value, put(a.extensionLoadRequested('test')));
  t.deepEqual(gen.next().value, call(requirePackage, 'test-dashboard-extension'));
  t.deepEqual(gen.throw().value, put(a.extensionLoadFailed('test')));
});

test('loadTheme succeed', t => {
  const gen = loadTheme('test');
  t.deepEqual(gen.next().value, put(a.themeLoadRequested('test')));
  t.deepEqual(gen.next().value, call(requirePackage, 'test-dashboard-theme'));
  t.deepEqual(gen.next().value, put(a.themeLoadSucceed('test')));
});

test('loadTheme failed', t => {
  const gen = loadTheme('test');
  t.deepEqual(gen.next().value, put(a.themeLoadRequested('test')));
  t.deepEqual(gen.next().value, call(requirePackage, 'test-dashboard-theme'));
  t.deepEqual(gen.throw().value, put(a.themeLoadFailed('test')));
});
