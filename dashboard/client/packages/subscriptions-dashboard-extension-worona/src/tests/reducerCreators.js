import test from 'ava';
import deepFreeze from 'deep-freeze';
import * as reducerCreators from '../reducerCreators';
import * as actions from '../actions';

test('collections should init to []', t => {
  const collection = reducerCreators.collectionCreator('test');
  t.deepEqual(collection(undefined, {}), []);
});

test('collections should add arrays when empty', t => {
  const collection = reducerCreators.collectionCreator('test');
  const collectionBefore = [];
  const newDoc = { id: 1, name: 'site1', url: 'url1' };
  const collectionAfter = [newDoc];
  const action = { collection: 'test', event: 'added', id: newDoc.id,
    fields: { name: newDoc.name, url: newDoc.url } };
  deepFreeze(collectionBefore);
  t.deepEqual(collection(collectionBefore, actions.subscriptionModified(action)), collectionAfter);
});

test('collections should add arrays when not empty', t => {
  const collection = reducerCreators.collectionCreator('test');
  const oldDoc = { id: 1, name: 'site1', url: 'url1' };
  const collectionBefore = [oldDoc];
  const newDoc = { id: 2, name: 'site2', url: 'url2' };
  const collectionAfter = [oldDoc, newDoc];
  const action = { collection: 'test', event: 'added', id: newDoc.id,
    fields: { name: newDoc.name, url: newDoc.url } };
  deepFreeze(collectionBefore);
  t.deepEqual(collection(collectionBefore, actions.subscriptionModified(action)), collectionAfter);
});

test('collections should substitute item when existing', t => {
  const collection = reducerCreators.collectionCreator('test');
  const oldDoc = { id: 1, name: 'site1', url: 'url1' };
  const collectionBefore = [oldDoc];
  const newDoc = { id: 1, name: 'site2', url: 'url2' };
  const collectionAfter = [newDoc];
  const action = { collection: 'test', event: 'added', id: newDoc.id,
    fields: { name: newDoc.name, url: newDoc.url } };
  deepFreeze(collectionBefore);
  t.deepEqual(collection(collectionBefore, actions.subscriptionModified(action)), collectionAfter);
});

test('collections should change existing item', t => {
  const collection = reducerCreators.collectionCreator('test');
  const oldDoc = { id: 1, name: 'site1', url: 'url1' };
  const collectionBefore = [oldDoc];
  const newDoc = { id: 1, name: 'site1', url: 'url2' };
  const collectionAfter = [newDoc];
  const action = { collection: 'test', event: 'changed', id: newDoc.id,
    fields: { url: newDoc.url } };
  deepFreeze(collectionBefore);
  t.deepEqual(collection(collectionBefore, actions.subscriptionModified(action)), collectionAfter);
});

test('collections should remove existing item', t => {
  const collection = reducerCreators.collectionCreator('test');
  const oldDoc = { id: 1, name: 'site1', url: 'url1' };
  const collectionBefore = [oldDoc];
  const collectionAfter = [];
  const action = { collection: 'test', event: 'removed', id: 1 };
  deepFreeze(collectionBefore);
  t.deepEqual(collection(collectionBefore, actions.subscriptionModified(action)), collectionAfter);
});

test('isReadyCreator', t => {
  const isReady = reducerCreators.isReadyCreator('test');
  t.false(isReady(undefined, {}));
  t.true(isReady(false, actions.subscriptionReady('test')));
  t.true(isReady(true, actions.subscriptionFailed('test')));
  t.false(isReady(true, actions.subscriptionStopped('test')));
});
