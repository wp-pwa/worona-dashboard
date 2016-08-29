import React from 'react';

import Header from '../Header';
import TopNav from '../Header/TopNav';
import Footer from '../Footer';
import FooterLinks from '../Footer/FooterLinks';
import Body from '../Body';
import Main from '../Main';
import Hero from '../elements/Hero';

import SitesList from './SitesList';

const Sites = () => (
  <Body>
    <Header>
      <TopNav />
      <Hero title="My Sites"
        subtitle="Configure your sites here or add a new one"
      />
    </Header>

    <Main>
      <SitesList />
    </Main>

    <Footer>
      <FooterLinks />
    </Footer>
  </Body>
);

export default Sites;
