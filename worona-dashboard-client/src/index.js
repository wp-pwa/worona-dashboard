import React from 'react';
import ReactDOM from 'react-dom';
import { Theme } from 'chess-theme';
import { reducers as accounts } from 'accounts';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';


const dashboard = combineReducers({
  accounts,
});

let store = createStore(dashboard);

class Dashboard extends React.Component {
  render() {
    return (
      <Theme />
    );
  }
}

ReactDOM.render(
  <Provider store={store}>
    <Dashboard />
  </Provider>,
  document.getElementById('root')
);
