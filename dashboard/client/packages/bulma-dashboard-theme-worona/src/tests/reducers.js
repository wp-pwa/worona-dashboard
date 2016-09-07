import test from 'ava';
import { mock } from 'worona-deps';
import { showingMobileMenu } from '../reducers/header';
import * as actions from '../actions';
import * as deps from '../dependencies';

mock(deps);
deps.actions.logoutSucceed = () => ({ type: deps.types.LOGOUT_SUCCEED });

test('header.showingMobileMenu', t => {
  t.false(showingMobileMenu(undefined, {}));
  t.true(showingMobileMenu(false, actions.toggleMobileMenu()));
  t.false(showingMobileMenu(true, actions.toggleMobileMenu()));
  t.false(showingMobileMenu(true, deps.actions.logoutSucceed()));
});
