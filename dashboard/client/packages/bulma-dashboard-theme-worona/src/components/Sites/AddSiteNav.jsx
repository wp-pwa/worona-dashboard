import React from 'react';
import { Link } from 'react-router';

const AddSiteNav = () => (
  <nav className="nav has-shadow">
      <div className="nav-left">
        <span className="nav-item">
          <Link className="button is-primary" to="add-site" href="add-site">
            <span className="icon">
              <i className="fa fa-plus-circle"></i>
            </span>
            <span>Add Site</span>
          </Link>
        </span>
      </div>
    </nav>
);

export default AddSiteNav;
