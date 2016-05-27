import test from 'ava';
import * as rC from '../reducerCreators';

test('isLoadingCreator', t => {
  const requested = {};
  const succeed = {};
  const failed = {};
  const reducer = rC.isLoadingCreator(requested, succeed, failed);
  t.false(reducer(undefined, {}));
  t.true(reducer(false, { type: requested }));
  t.false(reducer(true, { type: succeed }));
  t.false(reducer(true, { type: failed }));
});

test('isLoadedCreator', t => {
  const requested = {};
  const succeed = {};
  const reducer = rC.isLoadedCreator(requested, succeed);
  t.false(reducer(undefined, {}));
  t.true(reducer(false, { type: succeed }));
  t.false(reducer(true, { type: requested }));
});
