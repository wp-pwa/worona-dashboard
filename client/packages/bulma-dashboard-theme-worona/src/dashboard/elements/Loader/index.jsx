import React from 'react';
import styles from './style.css';

export default () => (
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
