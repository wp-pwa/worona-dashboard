import React from 'react';
import { Link } from 'react-router';

const Home = () => (
  <section className="hero is-info">
    <div className="hero-content">
      <div className="container">
        <h1 className="title">
          Dashboard
        </h1>
        <h2 className="subtitle">
          Welcome to Worona. You are only one step away to start making apps.
        </h2>
        <Link to="/login">
          <button className="button is-info is-outlined is-inverted">
            To the home!
          </button>
        </Link>
      </div>
    </div>
  </section>
);

export default Home;
