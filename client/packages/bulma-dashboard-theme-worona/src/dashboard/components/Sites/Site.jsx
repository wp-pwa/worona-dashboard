import React from 'react';
import cn from 'classnames';
import moment from 'moment';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import Icon from '../../elements/Icon';
import EditSiteLink from '../../elements/EditSiteLink';
import styles from './style.css';

const Site = ({ name, url, date, id, deleteModal, status = {} }) => (
  <div className="column is-narrow-mobile is-one-third-tablet is-one-quarter-desktop">
    <div className={cn('card', 'is-fullwidth')}>
      <header className="card-header">
        <p className="card-header-title">
          {name}
          <EditSiteLink id={id} color="#69707a" />
        </p>
        {
          status.type === 'conflict'
            ? <Link
              className="card-header-icon"
              style={{ color: 'red' }}
              to={`/check-site/${id}`}
              role="button"
            >
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
        <Link className="card-footer-item" to={`/check-site/${id}`} role="button">
          <Icon code="sliders" small />
          Configure
        </Link>
        <Link
          className="card-footer-item"
          to={`/check-site/${id}?redirect=/app/publish-native-app-extension-worona`}
          role="button"
        >
          <Icon code="cloud-upload" small />
          Publish
        </Link>
      </footer>
    </div>
  </div>
);
Site.propTypes = {
  name: React.PropTypes.string.isRequired,
  url: React.PropTypes.string.isRequired,
  id: React.PropTypes.string.isRequired,
  date: React.PropTypes.number.isRequired,
  deleteModal: React.PropTypes.func.isRequired,
  status: React.PropTypes.shape({
    type: React.PropTypes.string.isRequired,
    description: React.PropTypes.string,
  }),
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  deleteModal: () => dispatch(actions.deleteModalOpened({ id: ownProps.id, name: ownProps.name })),
});

export default connect(null, mapDispatchToProps)(Site);
