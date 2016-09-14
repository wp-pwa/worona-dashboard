import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import cn from 'classnames';

import Icon from '../elements/Icon';

const Tab = ({ name, target, location, icon, url, disabled }) => {
  const anchorClass = cn({
    'is-active': url === location || target === location,
    'is-disabled': disabled,
  });
  return (
    <li className={anchorClass}>
      <Link to={target} >
          <Icon iconFaCode={icon} />
        <span className="is-hidden-mobile">{name}</span>
      </Link>
    </li>
  );
};

Tab.propTypes = {
  name: React.PropTypes.string.isRequired,
  target: React.PropTypes.string.isRequired,
  location: React.PropTypes.string,
  icon: React.PropTypes.string,
  url: React.PropTypes.string,
  disabled: React.PropTypes.bool,
};

const mapStateToProps = state => ({ location: state.routing.locationBeforeTransitions.pathname });
connect(mapStateToProps)(Tab);

const ServiceTabs = () => (
  <div className="hero-foot">
    <div className="container">
      <div className="tabs is-boxed">
        <ul>
          <Tab name="Native & Web App" target="app" url="app" icon="mobile" />
          <Tab name="Instant Articles" target="fbia" url="fbia" icon="facebook" disabled />
          <Tab name="AMP" target="amp" url="amp" icon="google" disabled />
        </ul>
      </div>
    </div>
  </div>
);

export default ServiceTabs;
