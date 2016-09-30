import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import Site from './Site';
import * as deps from '../../dependencies';

const SitesList = ({ sites }) => (
  <div className="columns is-multiline">
    {sites.map(site => (
      <Site {...site} date={site.modifiedAt.$date} key={site.id} />
    ))}
  </div>
);
SitesList.propTypes = {
  sites: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  t: React.PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  sites: deps.selectors.getAllSites(state),
});

export default connect(mapStateToProps)(translate('bulma', { wait: true })(SitesList));
