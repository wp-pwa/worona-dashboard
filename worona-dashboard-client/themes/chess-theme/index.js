import React from 'react';
import './style.sass';
import { Header } from './components/Header';
import { headerItems } from './config.js';

export const Theme = () => (
  <div>
    <Header items={headerItems} />
    <section className="hero is-info">
      <div className="hero-content">
        <div className="container">
          <h1 className="title">
            Login or Register!
          </h1>
          <h2 className="subtitle">
            Welcome to Worona. You are only one step away to start making apps.
          </h2>
        </div>
      </div>
    </section>
  </div>
);
