import React from 'react';
import cn from 'classnames';

const Hero = ({ title, subtitle, color = 'primary', gradient = false }) => (
  <section className={cn('hero', `is-${color}`, gradient && 'is-bold')}>
    <div className="hero-body">
      <div className="container">
        <p className="title">
          {title}
        </p>
        <p className="subtitle">
          {subtitle}
        </p>
      </div>
    </div>
  </section>
);
Hero.propTypes = {
  title: React.PropTypes.oneOfType([
    React.PropTypes.node,
    React.PropTypes.string,
  ]).isRequired,
  subtitle: React.PropTypes.oneOfType([
    React.PropTypes.node,
    React.PropTypes.string,
  ]).isRequired,
  color: React.PropTypes.string,
  gradient: React.PropTypes.bool,
};

export default Hero;
