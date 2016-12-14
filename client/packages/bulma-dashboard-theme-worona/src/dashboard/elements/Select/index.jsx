import React from 'react';
import cx from 'classnames';

const Select = ({ name, size, options, selected, label }) => (
  <p className="control">
    {label && <label className="label" htmlFor={name}>{label}</label>}
    <span className={cx('select', size && `is-${size}`)}>
      <select defaultValue={selected}>
        {options.map((option, index) => <option value={option} key={index}>{option}</option>)}
      </select>
    </span>
  </p>
 );

Select.propTypes = {
  name: React.PropTypes.string,
  label: React.PropTypes.string,
  size: React.PropTypes.string,
  options: React.PropTypes.arrayOf(React.PropTypes.number),
  selected: React.PropTypes.number,
};

export default Select;
