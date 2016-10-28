import React from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import styles from './style.css';

import Hero from '../elements/Hero';
import TopNav from './TopNav';

const Header = ({ isReady, children }) => {
  if (isReady) {
    return (
      <section className={cn('hero', 'is-primary', styles.header)}>
        <TopNav />
        {children}
      </section>
    );
  }
  return (
    <section className={cn('hero', 'is-primary', styles.header)}>
      <TopNav />
      <Hero title="&nbsp;" subtitle="&nbsp;" />
    </section>
  );
};

Header.propTypes = {
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

export default connect(mapStateToProps)(Header);
