import test from 'ava';
import { isCreatingSite } from '../reducers';
import { createSiteRequested, createSiteFailed, createSiteSucceed } from '../actions';

test('isCreatingSite', t => {
  t.false(isCreatingSite(undefined, {}));
  t.true(isCreatingSite(false, createSiteRequested()));
  t.false(isCreatingSite(true, createSiteFailed()));
  t.false(isCreatingSite(true, createSiteSucceed()));
});
