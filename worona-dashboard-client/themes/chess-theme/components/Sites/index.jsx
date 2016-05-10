import React from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import moment from 'moment';
import Button from '../elements/Button';
import styles from './style.css';

const Site = ({ name, url, date }) => (
  <div className="column is-4">
    <div className="card">
      <header className="card-header is-centered">
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

const Sites = ({ sites }) => (
  <div>
    <section className="hero is-info">
      <div className="hero-content">
        <div className="container is-text-left">
          <div className="columns">
            <div className="column is-10">
              <p className="title">
                My sites
              </p>
              <p className="subtitle">
                Configure your sites here or add a new one.
              </p>
            </div>
            <div className="column">
              <Button color="success">
                Create new site
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className="section container">
      <div className="columns is-multiline">
        {sites.map(site => (
          <Site {...site} date={site.modifiedAt.$date} />
        ))}
      </div>
    </section>
  </div>
);
Sites.propTypes = {
  sites: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
};

const mapStateToProps = state => ({
  sites: state.sites.items,
});

export default connect(
  mapStateToProps
)(Sites);
