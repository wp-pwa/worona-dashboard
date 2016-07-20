import React from 'react';
import Footer from '../Footer';
import styles from './style.css';

export const Theme = ({ children }) => (
  <div className={styles.app}>
    <div></div>
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
