import test from 'ava';
import { counter } from '../reducers';
import { inc, dec } from '../actions';

test('counter should be 0 at init', t => {
  t.same(counter(undefined, {}), 0);
});

test('counter should be 1 if incremented', t => {
  t.same(counter(0, inc()), 1);
  t.same(counter(185, inc()), 186);
});

test('counter should be -1 if decremented', t => {
  t.same(counter(0, dec()), -1);
  t.same(counter(183, dec()), 182);
});
