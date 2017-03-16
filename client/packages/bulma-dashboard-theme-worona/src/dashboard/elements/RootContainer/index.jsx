import React from 'react';
import { connect } from 'react-redux';
import { capitalize } from 'lodash';
import Helmet from 'react-helmet';
import AsideMenu from '../AsideMenu';
import MobilePreview from '../MobilePreview';
import * as deps from '../../deps';

const RootContainer = ({ children, mobilePreview, packageNiceName, service }) => (
  <div className="columns is-mobile" >
    <Helmet title={`Worona Dashboard - ${capitalize(service)} - ${packageNiceName}`} />
    <AsideMenu />
    <div className="column">
      {children}
    </div>
    {mobilePreview && <MobilePreview />}
  </div>
);
RootContainer.propTypes = {
  mobilePreview: React.PropTypes.bool,
  children: React.PropTypes.node.isRequired,
  packageNiceName: React.PropTypes.string.isRequired,
  service: React.PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  packageNiceName: deps.selectors.getSelectedPackageNiceName(state),
  service: deps.selectors.getSelectedService(state),
});

export default connect(mapStateToProps)(RootContainer);
