import React from 'react';
import cn from 'classnames';
import styles from './style.css';

const Footer = () => (
  <footer className={cn(styles.footer, 'hero', 'is-info')}>
    <div className="hero-content">
      <div className="container">
        <div className="content has-text-centered">
          <p>
            Worona Labs SL. The source code is MIT licensed.
          </p>
          <p>
            <a className="button is-white is-outlined">
              <span className="icon">
                <i className="fa fa-github"></i>
              </span>
              <span>GitHub</span>
            </a>
          </p>
        </div>
    </div>
  </div>
</footer>
);

export default Footer;
