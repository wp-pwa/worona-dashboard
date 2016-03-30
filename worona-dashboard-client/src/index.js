import React from 'react';
import ReactDOM from 'react-dom';
import { Theme } from 'chess-theme';

class Dashboard extends React.Component {
  render() {
    return (
      <Theme />
    );
  }
}

ReactDOM.render(<Dashboard />, document.getElementById('root'));
