import React from 'react';
import cx from 'classnames';
import styles from './style.css';

const Input = (props) => {
  const { type = 'text', label, placeholder, icon, value = '', color, size, help } = props;
  return (
    <div className={styles.input}>
      {label ? <label className="label">{label}</label> : null}
      <p className={cx('control', icon && 'has-icon')}>
        <input className={cx('input', color && `is-${color}`, size && `is-${size}`)}
          type={type} placeholder={placeholder} value={value} {...props}
        />
        {icon ? <i className={`fa fa-${icon}`}></i> : null}
        {help ? <span className={`help is-${color}`}>{help}</span> : null}
      </p>
    </div>
  );
};

Input.propTypes = {
  type: React.PropTypes.string,
  label: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  icon: React.PropTypes.string,
  value: React.PropTypes.string,
  color: React.PropTypes.string,
  size: React.PropTypes.string,
  help: React.PropTypes.string,
};

export default Input;
