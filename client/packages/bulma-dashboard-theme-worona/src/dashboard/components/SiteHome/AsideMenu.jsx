import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as deps from '../../deps';

let MenuEntry = ({ name, target, selectedSiteId, selectedService }) => (
  <li>
    <Link to={`/site/${selectedSiteId}/${selectedService}/${target}`}
      role="button" activeClassName="is-active"
    >
      {name}
    </Link>
  </li>
);
MenuEntry.propTypes = {
  name: React.PropTypes.string,
  target: React.PropTypes.string,
  selectedSiteId: React.PropTypes.string.isRequired,
  selectedService: React.PropTypes.string.isRequired,
};

const mapStateToMenuEntryProps = (state) => ({
  selectedSiteId: deps.selectors.getSelectedSiteId(state),
  selectedService: deps.selectors.getSelectedService(state),
});

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
