import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { VelocityTransitionGroup } from 'velocity-react';
import worona from './worona-logo.png';
import { Menu } from './Menu';
import { toggleMobileMenu } from '../../actions';
import * as selectors from '../../selectors';
import styles from './style.css';

const TopNav = ({ items, toggle, active }) => {
  let navigationMenu = null;
  if (items.length > 0) {
    navigationMenu = (
      <div>
        <span className={`nav-toggle is-right ${(active ? 'is-active' : '')}`} onClick={toggle}>
          <span />
          <span />
          <span />
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
        <nav className={`nav ${styles.navigationMenu}`}>
          {/* Left side*/}
          <div className="nav-left">
            <Link className="nav-item is-brand" to="/" tabIndex="1" role="button">
              <img src={worona} alt="Worona" />
            </Link>
          </div>
          {navigationMenu}
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
