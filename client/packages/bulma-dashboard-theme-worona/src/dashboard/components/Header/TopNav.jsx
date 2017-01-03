import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { VelocityTransitionGroup } from 'velocity-react';
import worona from './worona-logo-white.svg';
import { Menu } from './Menu';
import { toggleMobileMenu, closeMobileMenu } from '../../actions';
import * as selectors from '../../selectors';
import styles from './style.css';

const TopNav = ({ items, active, toggle, close }) => {
  let navigationMenu = null;
  if (items.length > 0) {
    navigationMenu = (
      <div>
        <span className={`nav-toggle is-right ${styles.navigationMenu} ${(active ? 'is-active' : '')}`} onClick={toggle}>
          <span />
          <span />
          <span />
        </span>

        <Menu items={items} active={active} />

        <VelocityTransitionGroup
          enter={{ animation: 'slideDown', duration: 150 }}
          leave={{ animation: 'slideUp', duration: 150 }}
        >
          {active ? <Menu mobile items={items} active={active} /> : null}
        </VelocityTransitionGroup>
        {active ? <div className={styles.cover} onClick={close} /> : null}
      </div>
    );
  }
  return (
    <div className="hero-head">
      <div className="container">
        <nav className="nav">
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
  close: React.PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  items: selectors.getHeaderItems(state),
  active: state.theme.header.showingMobileMenu,
});

const mapDispatchToProps = (dispatch) => ({
  toggle: () => dispatch(toggleMobileMenu()),
  close: () => dispatch(closeMobileMenu()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TopNav);
