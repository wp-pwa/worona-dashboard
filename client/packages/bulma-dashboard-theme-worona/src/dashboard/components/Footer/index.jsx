import React from 'react';

const FooterEnd = () => (
  <div className="columns is-mobile">
    <div className="column is-one-third">
    © 2015 - 2016 Worona Labs S.L.
    </div>
    <div className="column is-one-third has-text-centered" />
    <div className="column is-one-third has-text-right">
      <a href="">Privacy &amp; Terms</a>
    </div>
  </div>
);

const Footer = ({ children }) => (
  <footer className="footer">
    <div className="container">
      {children}
      <hr />
      <FooterEnd />
    </div>
  </footer>
);

Footer.propTypes = {
  children: React.PropTypes.node.isRequired,
};

export default Footer;
