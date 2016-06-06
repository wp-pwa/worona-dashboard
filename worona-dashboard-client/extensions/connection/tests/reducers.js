import test from 'ava';
import {
  isConnecting,
  isConnected,
} from '../reducers';
import {
  connectionRequested,
  connectionSucceed,
  connectionFailed,
  disconnected,
} from '../actions';

test('isConnecting', t => {
  t.false(isConnecting(undefined, {}));
  t.true(isConnecting(false, connectionRequested()));
  t.false(isConnecting(true, connectionSucceed()));
  t.false(isConnecting(true, connectionFailed()));
});

test('isConnected', t => {
  t.false(isConnected(undefined, {}));
  t.true(isConnected(false, connectionSucceed()));
  t.false(isConnected(true, disconnected()));
});
