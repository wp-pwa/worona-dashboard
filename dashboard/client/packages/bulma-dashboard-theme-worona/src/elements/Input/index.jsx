import React from 'react';
import cx from 'classnames';
import styles from './style.css';

const Input = ({ input, meta: { touched, error }, size, label, icon, placeholder, type }) =>
  <div className={styles.input}>
    {label && <label className="label">{label}</label>}
    <p className={cx('control', icon && 'has-icon')}>
      <input className={cx('input', error && touched && 'is-danger', size && `is-${size}`)}
        {...input} placeholder={placeholder} type={type}
      />
    {icon && <i className={`fa fa-${icon}`}></i>}
      {touched && error && <span className="help is-danger">{error}</span>}
    </p>
  </div>;

Input.propTypes = {
  input: React.PropTypes.object,
  label: React.PropTypes.string,
  meta: React.PropTypes.shape({
    error: React.PropTypes.bool,
    touched: React.PropTypes.bool,
  }),
  size: React.PropTypes.string,
  icon: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  type: React.PropTypes.string,
};

export default Input;
