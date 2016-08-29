import React from 'react';

const Icon = ({ iconFaCode, small }) => (
  <span className={`icon ${(small ? 'is-small' : '')}`}>
    <i className={`fa fa-${iconFaCode}`}></i>
  </span>
);
Icon.propTypes = {
  iconFaCode: React.PropTypes.string.isRequired,
  small: React.PropTypes.bool,
};

export default Icon;
