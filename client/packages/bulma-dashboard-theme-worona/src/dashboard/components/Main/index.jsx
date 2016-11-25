import React from 'react';
import { connect } from 'react-redux';
import Loader from '../../elements/Loader';
import styles from './style.css';

const Main = ({ isReady, children }) => {
  if (!isReady) {
    return <Loader />;
  }
  return (
    <section className={`section ${styles.main}`}>
      {children}
    </section>
  );
};

Main.propTypes = {
  children: React.PropTypes.node.isRequired,
  isReady: React.PropTypes.bool,
};

const mapStateToProps = (state, ownProps) => ({
  isReady: !ownProps.waitForSelectors || ownProps.waitForSelectors.reduce(
    (previous, current) => (previous && current(state)), true),
});

export default connect(mapStateToProps)(Main);
