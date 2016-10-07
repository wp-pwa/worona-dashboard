import test from 'ava';
import { mock } from 'worona-deps';
import { showingMobileMenu } from '../reducers/header';
import { showingTermsAndConditions } from '../reducers/forms/register';
import * as actions from '../actions';
import * as deps from '../dependencies';

mock(deps);
deps.actions.logoutSucceed = () => ({ type: deps.types.LOGOUT_SUCCEED });

test('header.showingMobileMenu', t => {
  t.false(showingMobileMenu(undefined, {}));
  t.true(showingMobileMenu(false, actions.toggleMobileMenu()));
  t.false(showingMobileMenu(true, actions.toggleMobileMenu()));
  t.false(showingMobileMenu(undefined, actions.closeMobileMenu()));
  t.false(showingMobileMenu(undefined, deps.actions.logoutSucceed()));
});

test('forms.showingTermsAndConditions', t => {
  t.false(showingTermsAndConditions(undefined, {}));
  t.true(showingTermsAndConditions(false, actions.toggleTermsAndConditions()));
  t.false(showingTermsAndConditions(true, actions.toggleTermsAndConditions()));
  t.false(showingTermsAndConditions(undefined, actions.closeTermsAndConditions()));
});
