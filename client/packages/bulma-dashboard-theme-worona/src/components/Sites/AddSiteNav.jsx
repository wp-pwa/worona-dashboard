import React from 'react';
import Icon from '../elements/Icon';
import { Link } from 'react-router';

const AddSiteNav = () => (
  <nav className="nav has-shadow">
    <div className="nav-left">
      <span className="nav-item">
        <Link className="button is-primary" to="add-site" href="add-site">
          <Icon iconFaCode="plus-circle" />
          <span>Add Site</span>
        </Link>
      </span>
    </div>
  </nav>
);

export default AddSiteNav;
