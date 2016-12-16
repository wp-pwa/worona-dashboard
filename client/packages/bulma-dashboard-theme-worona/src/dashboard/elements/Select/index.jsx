import React from 'react';
import cx from 'classnames';

const Select = ({ input, name, size, options, label }) => (
  <p className="control">
    {label && <label className="label" htmlFor={name}>{label}</label>}
    <span className={cx('select', size && `is-${size}`)}>
      <select {...input}>
        {options.map((option, index) => <option key={index}>{option}</option>)}
      </select>
    </span>
  </p>
 );

Select.propTypes = {
  name: React.PropTypes.string,
  input: React.PropTypes.object,
  label: React.PropTypes.string,
  size: React.PropTypes.string,
  options: React.PropTypes.arrayOf(React.PropTypes.number),
};

export default Select;
