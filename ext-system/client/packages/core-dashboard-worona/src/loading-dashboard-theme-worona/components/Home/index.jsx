import React from 'react';
import { connect } from 'react-redux';
import { isReady, isLoading } from '../../dependencies';

export const Home = ({ ready, loading }) => (
  <div>
    {loading ? (<div>Loading extensions...</div>) : null}
    {ready ? (<div>Ready!!</div>) : null}
  </div>
);
Home.propTypes = {
  loading: React.PropTypes.bool.isRequired,
  ready: React.PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  ready: isReady(state),
  loading: isLoading(state),
});

export default connect(mapStateToProps)(Home);
