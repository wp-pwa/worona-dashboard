import React from 'react';
import { MenuItem } from './MenuItem.jsx';

export const Menu = ({ items, active }) => (
  <div className={`header-right header-menu ${(active ? 'is-active' : '')}`}>
    {items.map((item, index) =>
      (<MenuItem key={index} {...item} />)
    )}
  </div>
);
Menu.propTypes = {
  items: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  active: React.PropTypes.bool,
};
