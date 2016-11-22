import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import cn from 'classnames';
import * as deps from '../../deps';

import Icon from '../../elements/Icon';

let Tab = ({ name, service, selectedSiteId, selectedService, icon, disabled }) => {
  const liClass = cn({
    'is-disabled': disabled,
    'is-active': selectedService === service,
  });
  return (
    <li className={liClass}>
      <Link to={`/site/${selectedSiteId}/${service}`}>
        <Icon code={icon} />
        <span className="is-hidden-mobile">{name}</span>
      </Link>
    </li>
  );
};

Tab.propTypes = {
  name: React.PropTypes.string.isRequired,
  selectedSiteId: React.PropTypes.string.isRequired,
  selectedService: React.PropTypes.string.isRequired,
  icon: React.PropTypes.string,
  service: React.PropTypes.string,
  disabled: React.PropTypes.bool,
};

const mapStateToProps = state => ({
  selectedSiteId: deps.selectors.getSelectedSiteId(state),
  selectedService: deps.selectors.getSelectedService(state),
});
Tab = connect(mapStateToProps)(Tab);

const ServiceTabs = () => (
  <div className="hero-foot">
    <div className="container">
      <div className="tabs is-boxed">
        <ul>
          <Tab name="Native & Web App" service="app" icon="mobile" />
          <Tab name="Instant Articles" service="fbia" icon="facebook" />
          <Tab name="AMP" service="amp" icon="google" disabled />
        </ul>
      </div>
    </div>
  </div>
);

export default ServiceTabs;
