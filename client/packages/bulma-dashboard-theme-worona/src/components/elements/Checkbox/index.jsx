import React from 'react';
import styles from './style.css';

const Checkbox = ({ children, input, meta: { touched, error } }) => (
  <p className="control">
      <label className="checkbox">
        <input type="checkbox" className={styles.input} {...input} />
          {children}
      </label>
      { touched && error && <span className="help is-danger">{error}</span>}
    </p>
 );


Checkbox.propTypes = {
  input: React.PropTypes.object,
  children: React.PropTypes.object,
  meta: React.PropTypes.shape({
    error: React.PropTypes.string,
    touched: React.PropTypes.bool,
  }),
};

export default Checkbox;
