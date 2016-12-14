import React from 'react';
import cx from 'classnames';

const Select = ({ size, options, selected }) => {
  let generateOption;
  if (!selected) {
    generateOption = (option) => <option value={option}>{option}</option>;
  } else {
    generateOption = (option) => {
      if (selected === option) {
        return (<option value={option} selected>{option}</option>);
      }
      return (<option value={option}>{option}</option>);
    };
  }
  return (
    <span className={cx('select', size && `is-${size}`)}>
      <select>
        {options.map(generateOption)}
      </select>
    </span>
 );
};

Select.propTypes = {
  size: React.PropTypes.string,
  options: React.PropTypes.arrayOf(React.PropTypes.number),
  selected: React.PropTypes.number,
};

export default Select;
