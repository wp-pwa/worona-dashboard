import React from 'react';
import { connect } from 'react-redux';
import { isReady, isLoading } from '../../selectors';

const Loading = ({ ready, loading }) => (
  <div>
    {loading ? (<div>Loading extensions...</div>) : null}
    {ready ? (<div>Ready!!</div>) : null}
  </div>
);
Loading.propTypes = {
  loading: React.PropTypes.bool.isRequired,
  ready: React.PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  ready: isReady(state),
  loading: isLoading(state),
});

export default connect(mapStateToProps)(Loading);
