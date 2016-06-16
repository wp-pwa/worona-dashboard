import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import styles from './style.css';

const Theme = ({ children }) => (
  <div className={styles.body}>
    <div className={styles.header}>
      <Header />
    </div>
    <div className={styles.main}>
      {children}
    </div>
    <div className={styles.footer}>
      <Footer />
    </div>
  </div>
);
Theme.propTypes = {
  children: React.PropTypes.node.isRequired,
};

export default Theme;
