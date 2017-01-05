import React from 'react';
import { connect } from 'react-redux';
import { VelocityTransitionGroup } from 'velocity-react';
import { MenuCategory } from '../../elements/AsideMenu';
import Cover from '../../elements/Cover';
import * as deps from '../../deps';
import * as actions from '../../actions';

const MobileMenu = ({ categories, active, closeSiteHomeMobileMenu }) => (
  <VelocityTransitionGroup
    enter={{ animation: 'slideDown', duration: 150 }}
    leave={{ animation: 'slideUp', duration: 150 }}
  >
    {active ? (
      <div className="nav-right nav-menu">
        <aside className="menu">
          {categories.map(category =>
            <MenuCategory key={category.name} name={category.name} items={category.items} />
          )}
        </aside>
        <Cover onClick={closeSiteHomeMobileMenu} className="is-hidden-tablet" />
      </div>
    ) : null}
  </VelocityTransitionGroup>
);

MobileMenu.propTypes = {
  active: React.PropTypes.bool,
  categories: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  closeSiteHomeMobileMenu: React.PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  closeSiteHomeMobileMenu: () => dispatch(actions.closeSiteHomeMobileMenu()),
});

const mapStateToProps = (state) => ({
  active: state.theme.siteHome.showingSiteHomeMobileMenu,
  categories: deps.selectors.getCategories(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(MobileMenu);
