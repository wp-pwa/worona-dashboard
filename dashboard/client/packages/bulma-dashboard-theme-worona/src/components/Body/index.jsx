import React from 'react';
import styles from './style.css';

const Body = ({ children }) => (
  <div className={styles.body}>
    { children }
  </div>
);
Body.propTypes = {
  children: React.PropTypes.node.isRequired,
};

export default Body;
