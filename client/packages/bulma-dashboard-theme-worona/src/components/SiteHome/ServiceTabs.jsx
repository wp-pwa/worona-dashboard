import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import cn from 'classnames';

import Icon from '../elements/Icon';

let Tab = ({ name, target, service, params, icon, disabled }) => {
  const liClass = cn({
    'is-disabled': disabled,
    'is-active': params.service === service,
  });
  return (
    <li className={liClass}>
      <Link to={`/site/${params.siteId}/${target}`} activeClassName="is-active">
          <Icon iconFaCode={icon} />
        <span className="is-hidden-mobile">{name}</span>
      </Link>
    </li>
  );
};

Tab.propTypes = {
  name: React.PropTypes.string.isRequired,
  target: React.PropTypes.string.isRequired,
  params: React.PropTypes.object.isRequired,
  icon: React.PropTypes.string,
  service: React.PropTypes.string,
  disabled: React.PropTypes.bool,
};

const mapStateToProps = state => ({ params: state.router.params });
Tab = connect(mapStateToProps)(Tab);

const ServiceTabs = () => (
  <div className="hero-foot">
    <div className="container">
      <div className="tabs is-boxed">
        <ul>
          <Tab name="Native & Web App" target="app/general" service="app" icon="mobile" />
          <Tab name="Instant Articles" target="fbia/general" service="fbia" icon="facebook" />
          <Tab name="AMP" target="amp/general" service="amp" icon="google" disabled />
        </ul>
      </div>
    </div>
  </div>
);

export default ServiceTabs;
