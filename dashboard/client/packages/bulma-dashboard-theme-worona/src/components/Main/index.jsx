import React from 'react';
import styles from './style.css';

const Main = ({ children }) => (
  <div className={styles.main}>
    { children }
  </div>
);
Main.propTypes = {
  children: React.PropTypes.node.required,
};

export default Main;
