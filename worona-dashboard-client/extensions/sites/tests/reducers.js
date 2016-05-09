import test from 'ava';
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

test('items', t => {
  t.deepEqual(items(undefined, {}), []);
  const site1 = { name: 'site1', url: 'url1' };
  const site2 = { name: 'site2', url: 'url2' };
  t.deepEqual(
    items([], sitesCollectionModified('added', 1, site1)),
    [{ id: 1, name: site1.name, url: site1.url }]
  );
  t.deepEqual(
    items([{ id: 1, name: site1.name, url: site1.url }],
      sitesCollectionModified('added', 2, site2)), [
        { id: 1, name: site1.name, url: site1.url },
        { id: 2, name: site2.name, url: site2.url },
      ]
  );
  t.deepEqual(
    items([{ id: 1, name: site1.name, url: site1.url }],
      sitesCollectionModified('changed', 1, { name: 'otherName' })),
      [{ id: 1, name: 'otherName', url: site1.url }]
  );
  t.deepEqual(
    items([{ id: 1, name: site1.name, url: site1.url }],
      sitesCollectionModified('removed', 1)), []);
});
