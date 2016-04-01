import React from 'react';
import './style.sass';
import { Header } from './components/header/Header.jsx';
import FastClick from 'fastclick';

export const Theme = () => (
  <div>
    <Header />
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

window.addEventListener('load', () => {
  FastClick.attach(document.body);
});
