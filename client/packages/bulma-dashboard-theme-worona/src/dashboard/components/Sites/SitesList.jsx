import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { Link } from 'react-router';

import Site from './Site';
import * as deps from '../../deps';

const SitesList = ({ sites }) => {
  if (sites.length === 0) {
    return (
      <section className="hero is-medium">
        <div className="hero-body">
          <div className="container has-text-centered">
            <h1 className="title">
              No sites found
            </h1>
            <h2 className="subtitle">
              <Link to="/add-site">Add a WordPress site</Link> to start using Worona
            </h2>
          </div>
        </div>
      </section>
    );
  }
  return (
    <div className="columns is-multiline">
      {sites.map(site => (
        <Site {...site} date={site.modifiedAt.$date} key={site.id} />
      ))}
    </div>
  );
};

SitesList.propTypes = {
  sites: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
};

const mapStateToProps = state => ({
  sites: deps.selectors.getAllSites(state),
});

export default connect(mapStateToProps)(translate('bulma', { wait: true })(SitesList));
