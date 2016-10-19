import React from 'react';
import cn from 'classnames';
import moment from 'moment';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as deps from '../../deps';
import Icon from '../elements/Icon';
import styles from './style.css';

const Site = ({ name, url, date, id, deleteSite, status }) => (
  <div className="column is-narrow-mobile is-one-third-tablet is-one-quarter-desktop">
    <div className={cn('card', 'is-fullwidth')}>
      <header className="card-header">
        <p className="card-header-title">
          {name}
        </p>
        { status.type === 'conflict' ?
          <Link className="card-header-icon" style={{ color: 'red' }} to={`/check-site/${id}`} role="button" >
            <i className="fa fa-exclamation-triangle" />
          </Link>
        : null
        }
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
        <Link className="card-footer-item" to={`/check-site/${id}`} role="button" >
          <span className={cn('icon', 'is-small')}>
            <i className="fa fa-cog" />
          </span>
          Configure
        </Link>
        <button className={cn('card-footer-item', styles.button)} onClick={deleteSite} role="button" >
          <Icon code="trash-o" small />
          Delete
        </button>
      </footer>
    </div>
  </div>
);
Site.propTypes = {
  name: React.PropTypes.string.isRequired,
  url: React.PropTypes.string.isRequired,
  id: React.PropTypes.string.isRequired,
  date: React.PropTypes.number.isRequired,
  deleteSite: React.PropTypes.func.isRequired,
  status: React.PropTypes.shape({
    type: React.PropTypes.string.isRequired,
    description: React.PropTypes.string,
  }),
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  deleteSite: () => dispatch(deps.actions.deleteSiteRequested(ownProps.id)),
});

export default connect(null, mapDispatchToProps)(Site);
