import React from 'react';
import { connect } from 'react-redux';

import worona from './worona.png';
import { Item } from './Item.jsx';
import { toggleMobileMenu } from '../../actions';


export const HeaderSC = ({ items, toggle, active }) => (
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

        {/* Right side */}
        <div className={`header-right header-menu ${(active ? 'is-active' : '')}`}>
          {items.map((item, index) =>
            (<Item key={index} {...item} />)
          )}
        </div>
      </div>
    </header>
  </section>
);
HeaderSC.propTypes = {
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

export const Header = connect(mapStateToProps, mapDispatchToProps)(HeaderSC);
