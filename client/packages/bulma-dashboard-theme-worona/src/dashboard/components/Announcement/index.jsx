import React from 'react';
import { Link } from 'react-router';

const AddSiteNav = () => (
  <section className="container column is-half" style={{ margin: '20px auto', maxWidth: '700px' }}>
    <article className="message is-warning">
      <div className="message-header" style={{ fontWeight: 'bold' }}>
        <p>Important announcement</p>
      </div>
      <div className="message-body" style={{ textAlign: 'center', color: '#333' }}>
        {`Worona’s platform and services will not be available after October 20,
          2018 -> `}
        <Link href="https://www.worona.org/important-service-announcement">
          <strong>Learn more</strong>
        </Link>
      </div>
    </article>
  </section>
);

export default AddSiteNav;
