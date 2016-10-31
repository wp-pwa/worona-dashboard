import React from 'react';
import cn from 'classnames';
import styles from './style.css';

const Footer = ({ children }) => (
  <footer className={cn('footer', styles.footer)} >
    <div className="container">
      {children}
    </div>
  </footer>
);

Footer.propTypes = {
  children: React.PropTypes.node.isRequired,
};

export default Footer;
