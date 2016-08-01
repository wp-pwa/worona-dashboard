import React from 'react';
import cx from 'classnames';
import styles from './style.css';

const Input = ({ input, touched, error, size, label }) =>
  <div className={styles.input}>
    {label && <label className="label">{label}</label>}
    <p className={cx('control', input.icon && 'has-icon')}>
      <input className={cx('input', error && touched && 'is-danger', size && `is-${size}`)}
        {...input}
      />
    {input.icon && <i className={`fa fa-${input.icon}`}></i>}
      {touched && error && <span className="help is-danger">{error}</span>}
    </p>
  </div>;

Input.propTypes = {
  input: React.PropTypes.object,
  label: React.PropTypes.string,
  error: React.PropTypes.string,
  touched: React.PropTypes.bool,
  size: React.PropTypes.string,
};

export default Input;
