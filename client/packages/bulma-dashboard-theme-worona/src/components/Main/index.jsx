import React from 'react';
import styles from './style.css';

const Main = ({ children }) => (
  <section className={`section ${styles.main}`}>
    { children }
  </section>
);
Main.propTypes = {
  children: React.PropTypes.node.isRequired,
};

export default Main;
