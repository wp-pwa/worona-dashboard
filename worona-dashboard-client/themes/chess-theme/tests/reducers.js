import test from 'ava';
import { toggleMobileMenu } from '../creators';
import { showingMobileMenu, items, initialState as itemsInitialState } from '../reducers/header';
import { validationFailed } from '../reducers/forms';

test('header.showingMobileMenu', t => {
  t.false(showingMobileMenu(undefined, {}));
  t.true(showingMobileMenu(false, toggleMobileMenu()));
  t.false(showingMobileMenu(true, toggleMobileMenu()));
});

test('header.items', t => {
  t.is(items(undefined, {}), itemsInitialState);
});

test('forms.register.validationFailed', t => {
  t.false(validationFailed(undefined, {}));
  t.true(validationFailed(false, { type: 'redux-form/SUBMIT_FAILED', form: 'register' }));
  t.false(validationFailed(true, { type: 'any' }));
});
