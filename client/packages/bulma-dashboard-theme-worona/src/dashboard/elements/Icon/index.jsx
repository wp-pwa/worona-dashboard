import React from 'react';

const Icon = ({ code, small, color }) => (
  <span className={`icon ${(small ? 'is-small' : '')}`} style={{ color }}>
    <i className={`fa fa-${code}`} />
  </span>
);
Icon.propTypes = {
  code: React.PropTypes.string.isRequired,
  small: React.PropTypes.bool,
  color: React.PropTypes.string,
};

export default Icon;
