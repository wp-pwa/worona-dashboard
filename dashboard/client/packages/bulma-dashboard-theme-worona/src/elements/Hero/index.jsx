import React from 'react';
import cn from 'classnames';

const Hero = ({ title, subtitle, color = 'primary', gradient = false }) => (
  <section className={cn('hero', `is-${color}`, gradient && 'is-bold')}>
    <div className="hero-body">
      <div className="container">
        <h1 className="title">
          {title}
        </h1>
        <h2 className="subtitle">
          {subtitle}
        </h2>
      </div>
    </div>
  </section>
);
Hero.propTypes = {
  title: React.PropTypes.string.isRequired,
  subtitle: React.PropTypes.string.isRequired,
  color: React.PropTypes.string,
  gradient: React.PropTypes.bool,
};

export default Hero;
