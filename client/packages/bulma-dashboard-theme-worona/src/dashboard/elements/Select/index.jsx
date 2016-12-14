import React from 'react';
import cx from 'classnames';

const Select = ({ size, options, selected }) => (
  <span className={cx('select', size && `is-${size}`)}>
    <select defaultValue={selected}>
      {options.map((option, index) => <option value={option} key={index}>{option}</option>)}
    </select>
  </span>
 );

Select.propTypes = {
  size: React.PropTypes.string,
  options: React.PropTypes.arrayOf(React.PropTypes.number),
  selected: React.PropTypes.number,
};

export default Select;
