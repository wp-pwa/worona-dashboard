import React from 'react';
import cn from 'classnames';
import styles from './style.css';

const Footer = ({ children }) => (
  <footer className={cn(styles.footer, 'footer')}>
    {children}
  </footer>
);

Footer.propTypes = {
  children: React.PropTypes.node.isRequired,
};

export default Footer;
