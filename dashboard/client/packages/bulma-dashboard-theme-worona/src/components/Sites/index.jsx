import React from 'react';

import Header from '../Header';
import TopNav from '../Header/TopNav';
import Footer from '../Footer';
import FooterLinks from '../Footer/FooterLinks';
import Body from '../Body';
import Main from '../Main';
import Hero from '../elements/Hero';

import SitesList from './SitesList';
import AddSiteNav from './AddSiteNav';

const Sites = () => (
  <Body>
    <Header>
      <TopNav />
      <Hero title="Sites">
        Manage your <strong>WordPress Sites</strong> or add new ones.
      </Hero>
    </Header>

    <Main>
      <AddSiteNav />
      <SitesList />
    </Main>

    <Footer>
      <FooterLinks />
    </Footer>
  </Body>
);

export default Sites;
