import React from 'react';
import { dep } from 'worona-deps';
import { connect } from 'react-redux';
import * as deps from '../../deps';

const RootContainer = ({ selectedPackage }) => {
  const Root = dep(selectedPackage.namespace, 'components', 'Root');
  return (
    <div className="columns">
      <Root />
    </div>
  );
};
RootContainer.propTypes = {
  selectedPackage: React.PropTypes.shape({
    namespace: React.PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  selectedPackage: deps.selectors.getSelectedPackage(state),
});

export default connect(mapStateToProps)(RootContainer);
