import test from 'ava';
import { addPackage, getSagas } from 'worona-deps';
import { put, call, take, race } from 'redux-saga/effects';
import * as actions from '../actions';
import * as types from '../types';
import { loadSagas } from '../sagas/load';
import { addReducer, startSaga, reloadReducers, removeReducer, stopSaga } from '../store';

test('loadSagas', t => {
  const gen = loadSagas('settings', 'general');
  const testSagas = call(getSagas, 'settings');
  t.deepEqual(gen.next().value, testSagas);
  t.deepEqual(gen.next().value, call(startSaga, 'general', testSagas));
});

/*
test('themeDownloadSaga succeed', t => {
  const gen = sagas.themeDownloadSaga({ name: 'test', uid: 1 });
  t.deepEqual(gen.next().value, call(sagas.requirePackage, 'test-dashboard-theme'));
  const pkg = {};
  t.deepEqual(gen.next(pkg).value, call(addPackage, 'test', pkg));
  t.deepEqual(gen.next().value, put(actions.themeDownloadSucceed({ name: 'test', uid: 1 })));
});

test('themeDownloadSaga failed', t => {
  const name = 'test';
  const uid = 1;
  const gen = sagas.themeDownloadSaga({ name, uid });
  t.deepEqual(gen.next().value, call(sagas.requirePackage, 'test-dashboard-theme'));
  const error = {};
  t.deepEqual(gen.throw(error).value, put(actions.themeDownloadFailed({ error: error.message, name, uid })));
});

test('extensionDownloadSaga succeed', t => {
  const gen = sagas.extensionDownloadSaga({ name: 'test', uid: 1 });
  t.deepEqual(gen.next().value, call(sagas.requirePackage, 'test-dashboard-extension'));
  const pkg = {};
  t.deepEqual(gen.next(pkg).value, call(addPackage, 'test', pkg));
  t.deepEqual(gen.next().value, put(actions.extensionDownloadSucceed({ name: 'test', uid: 1 })));
});

test('extensionDownloadSaga failed', t => {
  const name = 'test';
  const uid = 1;
  const gen = sagas.extensionDownloadSaga({ name, uid });
  t.deepEqual(gen.next().value, call(sagas.requirePackage, 'test-dashboard-extension'));
  const error = {};
  t.deepEqual(gen.throw(error).value, put(actions.extensionDownloadFailed({ error: error.message, name, uid })));
});

test('packagesDownloadSucceedWatcher', t => {
  const succeedTypes = [types.THEME_DOWNLOAD_SUCCEED, types.EXTENSION_DOWNLOAD_SUCCEED];
  const action = { theme: 'test1', extensions: ['test2', 'test3'], uid: 1 };
  const gen = sagas.packagesDownloadSucceedWatcher(action);
  t.deepEqual(gen.next().value, take(succeedTypes));
  const action1 = { name: 'test1', uid: 1 };
  t.deepEqual(gen.next(action1).value, take(succeedTypes));
  const action2 = { name: 'test2', uid: 1 };
  t.deepEqual(gen.next(action2).value, take(succeedTypes));
  const action3 = { name: 'test3', uid: 2 };
  t.deepEqual(gen.next(action3).value, take(succeedTypes));
  const action4 = { name: 'test3', uid: 1 };
  t.deepEqual(gen.next(action4).value, put(actions.packagesDownloadSucceed(action)));
  t.true(gen.next().done);
});

test('packagesDownloadFailedWatcher', t => {
  const action = {};
  const gen = sagas.packagesDownloadFailedWatcher(action);
  t.deepEqual(gen.next().value, put(actions.packagesDownloadFailed(action)));
  t.true(gen.next().done);
});

test('packagesDownloadStarter', t => {
  const action = { theme: 'test1', extensions: ['test2', 'test3'], uid: 1 };
  const gen = sagas.packagesDownloadStarter(action);
  t.deepEqual(gen.next().value, put(actions.themeDownloadRequested({ name: 'test1', uid: 1 })));
  t.deepEqual(gen.next().value, [
    put(actions.extensionDownloadRequested({ name: 'test2', uid: 1 })),
    put(actions.extensionDownloadRequested({ name: 'test3', uid: 1 })),
  ]);
  t.true(gen.next().done);
});

test('packagesAdditionSaga succeed', t => {
  const action1 = { uid: 1 };
  const gen = sagas.packagesAdditionSaga(action1);
  t.deepEqual(gen.next().value, put(actions.packagesDownloadRequested(action1)));
  t.deepEqual(gen.next().value, race({
    succeed: take(types.PACKAGES_DOWNLOAD_SUCCEED),
    failed: take(types.PACKAGES_DOWNLOAD_FAILED),
  }));
  const action2 = { succeed: { uid: 2 } };
  t.deepEqual(gen.next(action2).value, race({
    succeed: take(types.PACKAGES_DOWNLOAD_SUCCEED),
    failed: take(types.PACKAGES_DOWNLOAD_FAILED),
  }));
  const action3 = { succeed: { uid: 1 } };
  t.deepEqual(gen.next(action3).value, put(actions.packagesLoadRequested(action1)));
  t.true(gen.next().done);
});

test('packagesAdditionSaga failed', t => {
  const action1 = { uid: 1 };
  const gen = sagas.packagesAdditionSaga(action1);
  t.deepEqual(gen.next().value, put(actions.packagesDownloadRequested(action1)));
  t.deepEqual(gen.next().value, race({
    succeed: take(types.PACKAGES_DOWNLOAD_SUCCEED),
    failed: take(types.PACKAGES_DOWNLOAD_FAILED),
  }));
  const action2 = { failed: { uid: 1 } };
  t.deepEqual(gen.next(action2).value, put(actions.packagesAdditionFailed(action2.failed)));
  t.true(gen.next().done);
});

test('loadPackage succeed', t => {
  const gen = sagas.loadPackage('test', 1);
  const runSaga = () => {};
  t.deepEqual(gen.next().value, call(getSagas, 'test'));
  const newSagas = {};
  t.deepEqual(gen.next(newSagas).value, call(runSaga, newSagas));
});

test('loadPackage succeed, no sagas', t => {
  const gen = sagas.loadPackage('test', 1);
  t.deepEqual(gen.next().value, call(getSagas, 'test'));
  t.true(gen.next().done);
});

test('loadPackage failed', t => {
  const gen = sagas.loadPackage('test', 1);
  t.deepEqual(gen.next().value, call(getSagas, 'test'));
  const error = {};
  t.deepEqual(gen.throw(error).value,
    put(actions.packagesLoadFailed({ error: error.message, name: 'test', uid: 1 })));
});

test('packagesLoadSaga', t => {
  const action = { theme: 'test1', extensions: ['test2', 'test3'], uid: 1 };
  const gen = sagas.packagesLoadSaga(action);
  const reloadReducers = () => {};
  t.deepEqual(gen.next().value, call(reloadReducers));
  t.deepEqual(gen.next().value, [
    call(sagas.loadPackage, action.extensions[0], action.uid),
    call(sagas.loadPackage, action.extensions[1], action.uid),
  ]);
  t.deepEqual(gen.next().value, call(sagas.loadPackage, action.theme, action.uid));
  t.deepEqual(gen.next().value, put(actions.packagesLoadSucceed(action)));
  t.true(gen.next().done);
});

test('loadCoreTheme pass', t => {
  const action = { uid: 1 };
  const gen = sagas.loadCoreTheme();
  t.deepEqual(gen.next().value, take(types.PACKAGES_LOAD_SUCCEED));
  t.deepEqual(gen.next(action).value, take(types.PACKAGES_LOAD_SUCCEED));
});

test('loadCoreTheme succeed', t => {
  const action = { uid: 'core', theme: 'test' };
  const gen = sagas.loadCoreTheme();
  t.deepEqual(gen.next().value, take(types.PACKAGES_LOAD_SUCCEED));
  t.deepEqual(gen.next(action).value,
    put(actions.themeChangeRequested({ name: action.theme, uid: 'core' })));
  t.deepEqual(gen.next().value,
    put(actions.themeChangeSucceed({ name: action.theme, uid: 'core' })));
  t.true(gen.next().done);
});

test('loadCoreTheme failed', t => {
  const action = { uid: 'core', theme: 'test' };
  const gen = sagas.loadCoreTheme();
  t.deepEqual(gen.next().value, take(types.PACKAGES_LOAD_SUCCEED));
  t.deepEqual(gen.next(action).value,
    put(actions.themeChangeRequested({ name: action.theme, uid: 'core' })));
  const error = {};
  t.deepEqual(gen.throw(error).value,
    put(actions.themeChangeFailed({ error: error.message, name: action.theme, uid: 'core' })));
  t.true(gen.next().done);
});
*/
