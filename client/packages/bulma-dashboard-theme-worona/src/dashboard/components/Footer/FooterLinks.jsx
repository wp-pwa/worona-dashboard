import React from 'react';
import styles from './style.css';

const FooterLinks = () => (
  <div className="columns">
    <div className="column is-one-third content">
      <h5 className={styles.h5}>Resources</h5>
      <ul>
        <li>
          <a href="https://worona.org" target="_blank">
            <span className="icon is-small"><i className="fa fa-home" /></span>
            &nbsp;
            <span>Website</span>
          </a>
        </li>
        <li>
          <a href="https://docs.worona.org" target="_blank">
            <span className="icon is-small"><i className="fa fa-book" /></span>
            &nbsp;
            <span>Documentation</span>
          </a>
        </li>
        <li>
          <a href="https://blog.worona.org" target="_blank">
            <span className="icon is-small"><i className="fa fa-rss" /></span>
            &nbsp;
            <span>Blog</span>
          </a>
        </li>
        <li>
          <a href="https://wordpress.org/plugins/worona/" target="_blank">
            <span className="icon is-small"><i className="fa fa-wordpress" /></span>
            &nbsp;
            <span>WordPress Plugin</span>
          </a>
        </li>
        <li>
          <a href="#" target="_blank">
            <span className="icon is-small"><i className="fa fa-info-circle" /></span>
            &nbsp;
            <span>Privacy &amp; Terms</span>
          </a>
        </li>
      </ul>
    </div>
    <div className="column is-one-third content">
      <h5 className={styles.h5}>Connect</h5>
      <ul>
        <li>
          <a href="https://twitter.com/getworona" target="_blank">
            <span className="icon is-small"><i className="fa fa-twitter" /></span>
            &nbsp;
            <span>Twitter</span>
          </a>
        </li>
        <li>
          <a href="https://www.facebook.com/getworona/" target="_blank">
            <span className="icon is-small"><i className="fa fa-facebook" /></span>
            &nbsp;
            <span>Facebook</span>
          </a>
        </li>
        <li>
          <a href="https://www.github.com/worona/" target="_blank">
            <span className="icon is-small"><i className="fa fa-github" /></span>
            &nbsp;
            <span>Github</span>
          </a>
        </li>
      </ul>
    </div>
    <div className="column is-one-third content">
      <h5 className={styles.h5}>Open Source</h5>
      <p>
        The source code of Worona Dashboard is licensed&nbsp;
        <a href="http://opensource.org/licenses/mit-license.php" target="_blank">MIT</a>.
        <br />
        If you want to collaborate join us on Github.
      </p>
      <br />
      <p>
        © 2015 - 2017 Worona Labs S.L.
      </p>
    </div>
  </div>
);

export default FooterLinks;
