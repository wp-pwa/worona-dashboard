import React from 'react';

import * as deps from '../../deps';

import Header from '../Header';
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
      <Hero title="Sites">
        Manage your <strong>WordPress Sites</strong> or add new ones.
      </Hero>
    </Header>

    <AddSiteNav />
    <Main waitForSubscriptions={[deps.selectors.getIsReadySites]}>
      <SitesList />
    </Main>

    <Footer>
      <FooterLinks />
    </Footer>
  </Body>
);

export default Sites;
