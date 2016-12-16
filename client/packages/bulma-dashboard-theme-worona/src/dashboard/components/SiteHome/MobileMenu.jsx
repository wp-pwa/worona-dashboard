import React from 'react';
import Icon from '../../elements/Icon';

const Menu = ({ entries }) => {
  {entries.map((item, index) =>
    (<span>{item.name}</span>)
  )}
};

const MobileMenu = ({ entries, active}) => (
  <nav className="nav has-shadow is-hidden-tablet">
    <div className="nav-left">
      <span className="nav-item">
        <a className="button" href="#">
          <Icon code="bars" small />
          <span>menu</span>
        </a>
      </span>
      {active ? <Menu entries={entries} active={active} /> : null}
    </div>
    <div className="nav-right">
      <span className="nav-item">
       <a className="button is-primary" href="#">
         <Icon code="eye" small />
         <span>Preview</span>
       </a>
      </span>
    </div>
  </nav>
);

export default MobileMenu;
