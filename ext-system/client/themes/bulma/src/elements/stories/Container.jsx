import React from 'react';

const Container = ({ children, inverted }) => (
  <section className="section" style={inverted ? { backgroundColor: 'black' } : {}}>
    <div className="container">
      {children}
    </div>
  </section>
);
Container.propTypes = {
  children: React.PropTypes.node.isRequired,
  inverted: React.PropTypes.bool,
};

export default Container;
