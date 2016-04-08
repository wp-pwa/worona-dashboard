import React from 'react';

const Container = ({ children }) => (
  <section className="section">
    <div className="container">
      {children}
    </div>
  </section>
);
Container.propTypes = { children: React.PropTypes.node.isRequired };

export default Container;
