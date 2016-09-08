import React from 'react';
import { connect } from 'react-redux';
import { VelocityTransitionGroup } from 'velocity-react';
import worona from './worona.png';
import { Menu } from './Menu.jsx';
import { toggleMobileMenu } from '../../actions';
import * as selectors from '../../selectors';

const TopNav = ({ items, toggle, active }) => {
  let navigationMenu;
  if (items.length > 0) {
    navigationMenu = (
      <div>
        <span className={`nav-toggle is-right ${(active ? 'is-active' : '')}`} onClick={toggle}>
          <span></span>
          <span></span>
          <span></span>
        </span>

        <Menu items={items} />

        <VelocityTransitionGroup
          enter={{ animation: 'slideDown', duration: 150 }}
          leave={{ animation: 'slideUp', duration: 150 }}
        >
          {active ? <Menu items={items} active={active} /> : null}
        </VelocityTransitionGroup>
      </div>
    );
  }
  return (
  <div className="hero-head">
    <div className="container">
      <nav className="nav">
        {/* Left side*/}
        <div className="nav-left">
          <a className="nav-item is-brand" href="/">
            <img src={worona} alt="Worona" />
          </a>
        </div>
        { navigationMenu }
      </nav>
    </div>
  </div>
  );
};


TopNav.propTypes = {
  items: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  active: React.PropTypes.bool.isRequired,
  toggle: React.PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  items: selectors.getHeaderItems(state),
  active: state.theme.header.showingMobileMenu,
});

const mapDispatchToProps = (dispatch) => ({
  toggle: () => dispatch(toggleMobileMenu()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TopNav);
