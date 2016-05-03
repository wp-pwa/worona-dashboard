import React from 'react';
import { MenuItem } from './MenuItem.jsx';

export const Menu = ({ items, active, isLoggedIn }) => (
  <div className={`header-right header-menu ${(active ? 'is-active' : '')}`}>
    {items.map((item, index) =>
      (<MenuItem key={index} {...item} />)
    )}
    {isLoggedIn ? <MenuItem type="text" name="Logout" url="" /> : null}
  </div>
);
Menu.propTypes = {
  items: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  active: React.PropTypes.bool,
  isLoggedIn: React.PropTypes.bool,
};
