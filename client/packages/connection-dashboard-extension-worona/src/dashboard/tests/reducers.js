import test from 'ava';
import * as reducers from '../reducers';
import * as actions from '../actions';

test('isConnecting', t => {
  t.false(reducers.isConnecting(undefined, {}));
  t.true(reducers.isConnecting(false, actions.connectionRequested()));
  t.false(reducers.isConnecting(true, actions.connectionSucceed()));
  t.false(reducers.isConnecting(true, actions.connectionFailed()));
});

test('isConnected', t => {
  t.false(reducers.isConnected(undefined, {}));
  t.true(reducers.isConnected(false, actions.connectionSucceed()));
  t.false(reducers.isConnected(true, actions.disconnected()));
});
