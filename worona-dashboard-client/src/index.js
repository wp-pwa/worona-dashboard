import React from 'react';
import ReactDOM from 'react-dom';
import { Theme } from 'chess-theme';
import { Provider } from 'react-redux';
import { store } from './store';

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
