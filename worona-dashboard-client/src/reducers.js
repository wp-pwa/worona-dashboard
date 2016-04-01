import { combineReducers } from 'redux';
import { accounts } from 'accounts/reducers';
import { theme } from 'chess-theme/reducers';

export const reducers = combineReducers({
  accounts,
  theme,
});
