import React from 'react';
import cn from 'classnames';
import moment from 'moment';
import styles from './style.css';

const Site = ({ name, url, date, id }) => (
  <div className="column is-narrow-mobile is-one-third-tablet is-one-quarter-desktop">
    <div className={cn('card', 'is-fullwidth', styles.card)}>
      <header className="card-header">
        <p className="card-header-title">
          {name}
        </p>
      </header>
      <div className="card-content">
        <div className="content">
          <strong>URL:</strong> {url}
          <br />
          <strong>Site ID:</strong> {id}
          <br />
          <br />
          <small>Last modified: {moment(date).fromNow()}</small>
        </div>
      </div>
      <footer className="card-footer">
        <a className="card-footer-item">
          <span className={cn('icon', 'is-small', styles.icons)}>
            <i className="fa fa-cog"></i>
          </span>
          Configure
        </a>
        <a className="card-footer-item">
          <span className={cn('icon', 'is-small', styles.icons)}>
            <i className="fa fa-trash-o"></i>
          </span>
          Delete
        </a>
      </footer>
    </div>
  </div>
);
Site.propTypes = {
  name: React.PropTypes.string.isRequired,
  url: React.PropTypes.string.isRequired,
  id: React.PropTypes.string.isRequired,
  date: React.PropTypes.number.isRequired,
};

export default Site;
