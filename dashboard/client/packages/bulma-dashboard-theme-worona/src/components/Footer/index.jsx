import React from 'react';
import styles from './style.css';
import cn from 'classnames';

const Footer = ({ children }) => (
  <footer className={cn(styles.footer, 'footer')}>
    {children}
  </footer>
);

Footer.propTypes = {
  children: React.PropTypes.node.required,
};

export default Footer;
