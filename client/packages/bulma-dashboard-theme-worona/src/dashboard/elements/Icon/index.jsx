import React from 'react';

const Icon = ({ code, small }) => (
  <span className={`icon ${(small ? 'is-small' : '')}`}>
    <i className={`fa fa-${code}`} />
  </span>
);
Icon.propTypes = {
  code: React.PropTypes.string.isRequired,
  small: React.PropTypes.bool,
};

export default Icon;
