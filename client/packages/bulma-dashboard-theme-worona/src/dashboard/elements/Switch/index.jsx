import React from 'react';
import BaseSwitch from 'react-ios-switch';
import '!style!css!postcss!react-ios-switch/build/bundle.css';

const Switch = ({ children, checked, label, name, input, meta: { touched, error } }) => (
  <div>
    {label && <label htmlFor={name} className="label">{label}</label>}
    <BaseSwitch checked={checked} {...input} />
    {children}
    {touched && error && <span className="help is-danger">{error}</span>}
  </div>
 );

Switch.propTypes = {
  input: React.PropTypes.object.isRequired,
  children: React.PropTypes.node,
  meta: React.PropTypes.shape({
    error: React.PropTypes.string,
    touched: React.PropTypes.bool,
  }),
  checked: React.PropTypes.bool,
  name: React.PropTypes.string,
  label: React.PropTypes.string,
};

export default Switch;
