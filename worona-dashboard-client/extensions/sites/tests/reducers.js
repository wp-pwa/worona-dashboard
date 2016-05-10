import test from 'ava';
import deepFreeze from 'deep-freeze';
import { isCreatingSite, createSiteStatus, createSiteError, items } from '../reducers';
import { createSiteRequested, createSiteFailed, createSiteSucceed, createSiteStatusChanged,
  sitesCollectionModified } from '../actions';

test('isCreatingSite', t => {
  t.false(isCreatingSite(undefined, {}));
  t.true(isCreatingSite(false, createSiteRequested()));
  t.false(isCreatingSite(true, createSiteFailed()));
  t.false(isCreatingSite(true, createSiteSucceed()));
});

test('createSiteStatus', t => {
  const status = {};
  t.false(createSiteStatus(undefined, {}));
  t.is(createSiteStatus(false, createSiteStatusChanged(status)), status);
  t.false(createSiteStatus(status, createSiteSucceed()));
  t.false(createSiteStatus(status, createSiteFailed()));
});

test('createSiteError', t => {
  const error = {};
  t.false(createSiteError(undefined, {}));
  t.is(createSiteError(false, createSiteFailed(error)), error);
  t.false(createSiteError(error, createSiteRequested()));
  t.false(createSiteError(error, createSiteSucceed()));
});

test('items should init to []', t => {
  t.deepEqual(items(undefined, {}), []);
});

test('items should add arrays when empty', t => {
  const itemsBefore = [];
  const newItem = { id: 1, name: 'site1', url: 'url1' };
  const itemsAfter = [newItem];
  deepFreeze(itemsBefore);
  t.deepEqual(items(itemsBefore,
    sitesCollectionModified('added', newItem.id, { name: newItem.name, url: newItem.url })),
    itemsAfter);
});

test('items should add arrays when not empty', t => {
  const oldItem = { id: 1, name: 'site1', url: 'url1' };
  const itemsBefore = [oldItem];
  const newItem = { id: 2, name: 'site2', url: 'url2' };
  const itemsAfter = [oldItem, newItem];
  deepFreeze(itemsBefore);
  t.deepEqual(items(itemsBefore,
    sitesCollectionModified('added', newItem.id, { name: newItem.name, url: newItem.url })),
    itemsAfter);
});

test('items should substitute item when existing', t => {
  const oldItem = { id: 1, name: 'site1', url: 'url1' };
  const itemsBefore = [oldItem];
  const newItem = { id: 1, name: 'site2', url: 'url2' };
  const itemsAfter = [newItem];
  deepFreeze(itemsBefore);
  t.deepEqual(items(itemsBefore,
    sitesCollectionModified('added', newItem.id, { name: newItem.name, url: newItem.url })),
    itemsAfter);
});

test('items should change existing item', t => {
  const oldItem = { id: 1, name: 'site1', url: 'url1' };
  const itemsBefore = [oldItem];
  const newItem = { id: 1, name: 'site1', url: 'url2' };
  const itemsAfter = [newItem];
  deepFreeze(itemsBefore);
  t.deepEqual(items(itemsBefore,
    sitesCollectionModified('changed', newItem.id, { url: newItem.url })),
    itemsAfter);
});

test('items should remove existing item', t => {
  const oldItem = { id: 1, name: 'site1', url: 'url1' };
  const itemsBefore = [oldItem];
  const itemsAfter = [];
  deepFreeze(itemsBefore);
  t.deepEqual(items(itemsBefore,
    sitesCollectionModified('removed', 1)),
    itemsAfter);
});
