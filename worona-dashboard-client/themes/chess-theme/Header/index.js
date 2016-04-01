import React from 'react';
import worona from './worona.png';
import { Item } from './Item.jsx';
// import style from './style.css';

export class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showingMobileMenu: false,
    };
  }

  toggleMobileMenu(self) {
    self.setState({
      showingMobileMenu: !self.state.showingMobileMenu,
    });
  }

  render() {
    const mobileClass = this.state.showingMobileMenu ? 'is-active' : '';
    return (
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
            <span className={`header-toggle ${mobileClass}`}
              onClick={() => this.toggleMobileMenu(this)}
            >
              <span></span>
              <span></span>
              <span></span>
            </span>

            {/* Right side */}
            <div className={`header-right header-menu ${mobileClass}`}>
              {this.props.items.map((item, index) =>
                (<Item key={index} {...item} />)
              )}
            </div>
          </div>
        </header>
      </section>
    );
  }
}
Header.propTypes = {
  items: React.PropTypes.arrayOf(React.PropTypes.object),
};
