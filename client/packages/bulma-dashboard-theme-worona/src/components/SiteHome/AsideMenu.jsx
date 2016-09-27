import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import * as deps from '../../dependencies';

let MenuEntry = ({ name, target, params }) => (
  <li>
    <Link to={`/site/${params.siteId}/${params.service}/${target}`}
      role="button" activeClassName="is-active"
    >
      {name}
    </Link>
  </li>
);

const mapStateToMenuEntryProps = (state) => ({
  params: state.router.params,
});

MenuEntry.propTypes = {
  name: React.PropTypes.string,
  target: React.PropTypes.string,
  params: React.PropTypes.object.isRequired,
};

MenuEntry = connect(mapStateToMenuEntryProps)(MenuEntry);

const MenuCategory = ({ name, entries }) => (
  <div name={name}>
    <p className="menu-label">
      {name}
    </p>
    <ul className="menu-list">
      {entries.map((entry, index) =>
        (<MenuEntry key={index} tabindex={index + 4} {...entry} />)
      )}
    </ul>
  </div>
);

MenuCategory.propTypes = {
  name: React.PropTypes.string,
  entries: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
};

const AsideMenu = ({ settings }) => (
    <div className="column is-hidden-mobile is-2-desktop">
        <aside className="menu">
          {
            settings.map(({ name, entries }, index) =>
            (<MenuCategory key={index} name={name}
              entries={entries}
            />)
            )
          }
        </aside>
    </div>
);

AsideMenu.propTypes = {
  settings: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
};

const mapStateToMenuProps = (state) => ({
  settings: deps.selectors.getSiteSettingsByCategory(deps.selectors.getSiteId(state))(state),
});

export default connect(mapStateToMenuProps)(AsideMenu);
