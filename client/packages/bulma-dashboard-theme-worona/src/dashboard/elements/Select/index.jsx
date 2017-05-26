import React from 'react';
import cx from 'classnames';

const Select = ({ input, name, size, options, label, values = [] }) => (
  <div>
    {label && <label className="label" htmlFor={name}>{label}</label>}
    <p className="control">
      <span className={cx('select', size && `is-${size}`)}>
        <select {...input}>
          {options.map((option, index) => (
            <option value={values[index] || option} key={index}>
              {option}
            </option>
          ))}
        </select>
      </span>
    </p>
  </div>
);

Select.propTypes = {
  name: React.PropTypes.string,
  input: React.PropTypes.shape({}),
  label: React.PropTypes.string,
  size: React.PropTypes.string,
  options: React.PropTypes.arrayOf(
    React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string])
  ),
  values: React.PropTypes.arrayOf(
    React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string])
  ),
};

export default Select;
