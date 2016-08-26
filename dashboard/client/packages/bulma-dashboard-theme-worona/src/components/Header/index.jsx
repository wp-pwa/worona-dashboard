import React from 'react';

const Header = ({ children }) => (
  <section className="hero is-primary">
    {children}
  </section>
);

Header.propTypes = {
  children: React.PropTypes.node.required,
};

export default Header;
