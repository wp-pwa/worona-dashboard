import test from 'ava';
import { showingMobileMenu } from '../reducers';
import { toggleMobileMenu } from '../actions';
import { items, initialState as itemsInitialState } from '../reducers/header-items';

// theme.header.showingMobileMenu
test('theme.header.showingMobileMenu should be false at init', t => {
  t.false(showingMobileMenu(undefined, {}));
});

test('theme.header.showingMobileMenu should be true when toggle', t => {
  t.true(showingMobileMenu(false, toggleMobileMenu()));
});

test('theme.header.showingMobileMenu should be false again when toggle', t => {
  t.false(showingMobileMenu(true, toggleMobileMenu()));
});

// theme.header.items
test('theme.header.items should be the same than initialState', t => {
  t.same(items(undefined, {}), itemsInitialState);
});
