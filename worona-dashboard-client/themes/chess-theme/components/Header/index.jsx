import React from 'react';
import { connect } from 'react-redux';
import { VelocityTransitionGroup } from 'velocity-react';

import worona from './worona.png';
import { Menu } from './Menu.jsx';
import { toggleMobileMenu } from '../../actions';


let Header = ({ items, toggle, active }) => (
  <section className="hero is-info">
    <header className="header">
      <div className="container">
        {/* Left side*/}
        <div className="header-left">
          <a className="header-item" href="/">
            <img src={worona} alt="Logo" />
          </a>
        </div>

        {/* Hamburger menu (on mobile) */}
        <span className={`header-toggle ${(active ? 'is-active' : '')}`}
          onClick={toggle}
        >
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
          duration={300}
        >
          {active ? <Menu items={items} active={active} /> : null}
        </VelocityTransitionGroup>
      </div>
    </header>
  </section>
);
Header.propTypes = {
  items: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  active: React.PropTypes.bool.isRequired,
  toggle: React.PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  items: state.theme.header.items,
  active: state.theme.header.showingMobileMenu,
});

const mapDispatchToProps = (dispatch) => ({
  toggle: () => dispatch(toggleMobileMenu()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
