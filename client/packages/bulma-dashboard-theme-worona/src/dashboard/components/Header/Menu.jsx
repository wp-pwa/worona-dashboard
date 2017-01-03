import React from 'react';
import MenuItem from './MenuItem';
import styles from './style.css';

export const Menu = ({ items, active, mobile }) => (
  <div className={`nav-right nav-menu ${styles.navigationMenu} ${(active ? 'is-active' : '')} ${(mobile ? 'is-hidden-tablet' : '')}`}>
    {items.map((item, index) =>
      (<MenuItem key={index} tabindex={index + 2} {...item} />)
    )}
  </div>
);
Menu.propTypes = {
  items: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  active: React.PropTypes.bool,
  mobile: React.PropTypes.bool,
};

export default Menu;
