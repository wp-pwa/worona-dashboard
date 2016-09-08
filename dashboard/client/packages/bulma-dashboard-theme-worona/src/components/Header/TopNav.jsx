import React from 'react';
import { connect } from 'react-redux';
import { VelocityTransitionGroup } from 'velocity-react';
import worona from './worona.png';
import { Menu } from './Menu.jsx';
import { toggleMobileMenu } from '../../actions';
import * as selectors from '../../selectors';

const TopNav = ({ items, toggle, active }) => (
  <div className="hero-head">
    <div className="container">
      <nav className="nav">
        {/* Left side*/}
        <div className="nav-left">
          <a className="nav-item is-brand" href="/">
            <img src={worona} alt="Worona" />
          </a>
        </div>

        {/* Hamburger menu (on mobile) */}
        <span className={`nav-toggle is-right ${(active ? 'is-active' : '')}`} onClick={toggle}>
          <span></span>
          <span></span>
          <span></span>
        </span>

        {/* Right side, not mobile */}
        <Menu items={items} />

        {/* Right side, mobile */}
        <VelocityTransitionGroup
          enter={{ animation: 'slideDown', duration: 150 }}
          leave={{ animation: 'slideUp', duration: 150 }}
        >
          {active ? <Menu items={items} active={active} /> : null}
        </VelocityTransitionGroup>
      </nav>
    </div>
  </div>
);
TopNav.propTypes = {
  items: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  active: React.PropTypes.bool.isRequired,
  toggle: React.PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  items: selectors.header.items(state),
  active: state.bulma.header.showingMobileMenu,
});

const mapDispatchToProps = (dispatch) => ({
  toggle: () => dispatch(toggleMobileMenu()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TopNav);
