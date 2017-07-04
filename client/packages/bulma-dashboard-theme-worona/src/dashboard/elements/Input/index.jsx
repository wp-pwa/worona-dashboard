import React from 'react';
import cx from 'classnames';
import styles from './style.css';

const Input = ({ input, meta: { touched, error }, disabled, size, label, icon, placeholder,
   type, name }) =>
     <div className={styles.input}>
       {label && <label htmlFor={name} className="label">{label}</label>}
       <p className={cx('control', icon && 'has-icon')}>
         <input
           className={cx('input', error && touched
            && 'is-danger', size && `is-${size}`, disabled && 'is-disabled')}
           {...input} placeholder={placeholder} type={type}
         />
         {icon && <i className={`fa fa-${icon}`} />}
         {touched && error && <span className="help is-danger">{error}</span>}
       </p>
     </div>;

Input.propTypes = {
  input: React.PropTypes.shape({}),
  name: React.PropTypes.string,
  label: React.PropTypes.string,
  meta: React.PropTypes.shape({
    error: React.PropTypes.string,
    touched: React.PropTypes.bool,
  }),
  disabled: React.PropTypes.bool,
  size: React.PropTypes.string,
  icon: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  type: React.PropTypes.string,
};

export default Input;
