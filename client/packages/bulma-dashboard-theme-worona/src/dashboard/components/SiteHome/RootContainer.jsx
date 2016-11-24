import React from 'react';
import { dep } from 'worona-deps';
import { connect } from 'react-redux';
import * as deps from '../../deps';
import Loader from '../../elements/Loader';

let RootNode = ({ namespace }) => {
  const Root = dep(namespace, 'components', 'Root');
  return <Root />;
};
RootNode.propTypes = {
  namespace: React.PropTypes.string.isRequired,
};
const mapRootNodeStateToProps = state => ({
  namespace: deps.selectors.getSelectedPackage(state).namespace,
});
RootNode = connect(mapRootNodeStateToProps)(RootNode);

const RootContainer = ({ selectedPackageIsActivated }) => (
  <div className="columns">
    {selectedPackageIsActivated ? <RootNode /> : <Loader />}
  </div>
);
RootContainer.propTypes = {
  selectedPackageIsActivated: React.PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  selectedPackageIsActivated: deps.selectors.getSelectedPackageIsActivated(state),
});

export default connect(mapStateToProps)(RootContainer);
