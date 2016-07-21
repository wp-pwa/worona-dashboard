import test from 'ava';
import * as reducers from '../reducers';
import * as actions from '../actions';

test('isCreatingSite', t => {
  t.false(reducers.isCreatingSite(undefined, {}));
  t.true(reducers.isCreatingSite(false, actions.createSiteRequested()));
  t.false(reducers.isCreatingSite(true, actions.createSiteFailed()));
  t.false(reducers.isCreatingSite(true, actions.createSiteSucceed()));
});

test('createSiteStatus', t => {
  const status = {};
  t.false(reducers.createSiteStatus(undefined, {}));
  t.is(reducers.createSiteStatus(false, actions.createSiteStatusChanged(status)), status);
  t.false(reducers.createSiteStatus(status, actions.createSiteSucceed()));
  t.false(reducers.createSiteStatus(status, actions.createSiteFailed()));
});

test('createSiteError', t => {
  const error = {};
  t.false(reducers.createSiteError(undefined, {}));
  t.is(reducers.createSiteError(false, actions.createSiteFailed(error)), error);
  t.false(reducers.createSiteError(error, actions.createSiteRequested()));
  t.false(reducers.createSiteError(error, actions.createSiteSucceed()));
});
