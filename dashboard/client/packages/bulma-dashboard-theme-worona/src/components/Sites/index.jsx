import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import Button from '../../elements/Button';
import Site from './Site';

const Sites = ({ sites, t }) => (
  <div>
    <section className="hero is-info">
      <div className="hero-body">
        <div className="container is-text-left">
          <div className="columns">
            <div className="column is-10">
              <p className="title">
                {t('MySites')}
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
          <Site {...site} date={site.modifiedAt.$date} key={site.id} />
        ))}
      </div>
    </section>
  </div>
);
Sites.propTypes = {
  sites: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  t: React.PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  sites: state.sites.collection,
});

export default connect(mapStateToProps)(translate('bulma', { wait: true })(Sites));
