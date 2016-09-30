import React from 'react';

const Theme = ({ children }) => children;
Theme.propTypes = {
  children: React.PropTypes.node.isRequired,
};

export default Theme;
