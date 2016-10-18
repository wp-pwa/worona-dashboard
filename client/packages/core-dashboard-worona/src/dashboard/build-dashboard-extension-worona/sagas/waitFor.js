/* eslint-disable no-constant-condition */
import { take } from 'redux-saga/effects';

// Wait until success or failure actions. It ends on success and throws on failure.
export function* waitFor(name, success, failure) {
  while (true) {
    const { type, pkg, error } = yield take([success, failure]);
    if (pkg.name === name) {
      if (type === success) break;
      else if (error) throw error;
    }
  }
}
