import React from 'react';

const Icon = ({ iconFaCode, small }) => (
  <span className="icon">
    <i className={`fa fa-${iconFaCode} ${(small ? 'is-small' : '')}`}></i>
  </span>
);
Icon.propTypes = {
  iconFaCode: React.PropTypes.string.isRequired,
  small: React.PropTypes.bool,
};

export default Icon;
