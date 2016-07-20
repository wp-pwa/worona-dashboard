import test from 'ava';
import { isCreatingSite, createSiteStatus, createSiteError } from '../reducers';
import { createSiteRequested, createSiteFailed, createSiteSucceed, createSiteStatusChanged }
  from '../actions';

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
