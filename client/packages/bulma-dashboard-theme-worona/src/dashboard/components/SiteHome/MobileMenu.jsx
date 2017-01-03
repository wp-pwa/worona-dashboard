import React from 'react';
import { map } from 'lodash';
import { connect } from 'react-redux';
import { MenuCategory } from '../../elements/AsideMenu';
import Cover from '../../elements/Cover';
import * as deps from '../../deps';
import * as actions from '../../actions';

const MobileMenu = ({ settings, active, closeSiteHomeMobileMenu }) => (
  <div className={`nav-right nav-menu ${(active ? 'is-active' : '')}`}>
    <aside className="menu">
      {
        map(settings, (entries, name) =>
          <MenuCategory key={name} name={name} entries={entries} />
        )
      }
    </aside>
    <Cover onClick={closeSiteHomeMobileMenu} className="is-hidden-tablet" hide={!active} />
  </div>
);

MobileMenu.propTypes = {
  active: React.PropTypes.bool,
  settings: React.PropTypes.objectOf(React.PropTypes.array).isRequired,
  closeSiteHomeMobileMenu: React.PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  closeSiteHomeMobileMenu: () => dispatch(actions.closeSiteHomeMobileMenu()),
});

const mapStateToProps = (state) => ({
  active: state.theme.siteHome.showingSiteHomeMobileMenu,
  settings: deps.selectors.getCategories(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(MobileMenu);
