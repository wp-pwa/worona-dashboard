import React from 'react';
import AsideMenu from '../AsideMenu';
import MobilePreview from '../MobilePreview';

const RootContainer = ({ children, mobilePreview }) => (
  <div className="columns is-mobile" >
    <AsideMenu />
    <div className="column content">
      {children}
    </div>
    {mobilePreview && <MobilePreview />}
  </div>
);
RootContainer.propTypes = {
  mobilePreview: React.PropTypes.bool,
  children: React.PropTypes.node.isRequired,
};

export default RootContainer;
