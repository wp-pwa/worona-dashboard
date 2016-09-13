import React from 'react';
import styles from './style.css';
import cn from 'classnames';

const Header = ({ children }) => (
  <section className={cn('hero', 'is-primary', styles.header)}>
    {children}
  </section>
);

Header.propTypes = {
  children: React.PropTypes.node.isRequired,
};

export default Header;
