import React from 'react';
import { connect } from 'react-redux';

import styles from './style.css';

const Main = ({ isReady, children }) => {
  if (!isReady) {
    return (
      <section className={`section ${styles.main}`}>
        <div className={`spinner ${styles.spinner}`}>
          <div className={styles.bounce1} />
          <div className={styles.bounce2} />
          <div className={styles.bounce3} />
        </div>

        <div id="loading-message" className={`has-text-centered ${styles.loading}`}>
          Retrieving data...
        </div>
      </section>
    );
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

const mapStateToProps = (state, ownProps) => {
  if (!ownProps.waitForSubscriptions) return ({ isReady: true });
  return ({
    isReady: ownProps.waitForSubscriptions.reduce(
      (previous, current) => (previous && current(state)),
      true),
  });
};

export default connect(mapStateToProps)(Main);
