import test from 'ava';
import { put, call } from 'redux-saga/effects';
import * as a from '../actions';
import { requirePackage, loadExtension } from '../sagas';

test('loadExtension', t => {
  const gen = loadExtension('test');
  t.deepEqual(gen.next().value, put(a.extensionLoadRequested('test')));
  t.deepEqual(gen.next().value, call(requirePackage, 'test-dashboard-extension'));
});
