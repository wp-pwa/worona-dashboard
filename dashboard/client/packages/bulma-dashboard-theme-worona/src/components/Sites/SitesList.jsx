import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import Site from './Site';

const SitesList = ({ sites }) => (
  <div>
    <section className="section container">
      <div className="columns is-multiline">
        {sites.map(site => (
          <Site {...site} date={site.modifiedAt.$date} key={site.id} />
        ))}
      </div>
    </section>
  </div>
);
SitesList.propTypes = {
  sites: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  t: React.PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  sites: state.sites.collection,
});

export default connect(mapStateToProps)(translate('bulma', { wait: true })(SitesList));
