import React from 'react';
import { map } from 'lodash';
import { connect } from 'react-redux';
import { MenuCategory } from '../../elements/AsideMenu';
import * as deps from '../../deps';

const MobileMenu = ({ settings, active }) => (
  <div className={`nav-right nav-menu ${(active ? 'is-active' : '')}`}>
    <aside className="menu">
      {
        map(settings, (entries, name) =>
          <MenuCategory key={name} name={name} entries={entries} />
        )
      }
    </aside>
  </div>
);

MobileMenu.propTypes = {
  active: React.PropTypes.bool,
  settings: React.PropTypes.objectOf(React.PropTypes.array).isRequired,
};

const mapStateToProps = (state) => ({
  active: state.theme.siteHome.showingSiteHomeMobileMenu,
  settings: deps.selectors.getCategories(state),
});

export default connect(mapStateToProps)(MobileMenu);
