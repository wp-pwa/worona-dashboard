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

const AsideMenu = ({ settingCategories, settingMenuEntries }) => (
    <div className="column is-hidden-mobile is-2-desktop">
        <aside className="menu">
          {
            settingCategories.map(({ name }, index) =>
            (<MenuCategory key={index} name={name}
              entries={settingMenuEntries.filter(entry => entry.categoryName === name)}
            />)
            )
          }
        </aside>
    </div>
);

AsideMenu.propTypes = {
  settingCategories: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  settingMenuEntries: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
};

const mapStateToMenuProps = (state) => ({
  settingCategories: deps.selectors.getCategories(state),
  settingMenuEntries: deps.selectors.getSiteSettings(
    deps.selectors.getSiteId(state))(state),
});

export default connect(mapStateToMenuProps)(AsideMenu);
