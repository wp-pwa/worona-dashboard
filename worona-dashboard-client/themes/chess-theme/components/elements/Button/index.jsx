import React from 'react';
import cx from 'classnames';

const Button = ({
  children, onClick, color, size, outlined, center, loading, disabled, animate,
}) => {
  const buttonClass = cx(
    'button',
    color && `is-${color}`,
    size && `is-${size}`,
    loading && 'is-loading',
    outlined && 'is-outlined',
    disabled && 'is-disabled',
    animate && `animated ${animate}`
  );
  return (
    <div className={cx(center && 'is-text-centered')}>
      <button className={buttonClass} onClick={onClick}>
        {children}
      </button>
    </div>
  );
};

Button.propTypes = {
  children: React.PropTypes.node.isRequired,
  onClick: React.PropTypes.func,
  color: React.PropTypes.string,
  size: React.PropTypes.string,
  outlined: React.PropTypes.bool,
  center: React.PropTypes.bool,
  loading: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
  animate: React.PropTypes.string,
};

export default Button;
