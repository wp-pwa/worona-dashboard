import React from 'react';
import cn from 'classnames';
import moment from 'moment';
import styles from './style.css';

const Site = ({ name, url, date }) => (
  <div className="column is-4 is-centered">
    <div className={cn('card', styles.card)}>
      <header className="card-header">
        <a href="#" className="card-header-title is-info">
          {name}
        </a>
      </header>
      <div className="card-content">
        <div className="content">
          {url}
          <br />
          <small>Modified: {moment(date).fromNow()}</small>
        </div>
      </div>
      <footer className="card-footer">
        <a className="card-footer-item">
          <span className={cn('icon', 'is-small', styles.icons)}>
            <i className="fa fa-sliders"></i>
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
  date: React.PropTypes.number.isRequired,
};

export default Site;
