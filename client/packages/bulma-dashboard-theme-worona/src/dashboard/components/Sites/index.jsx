import React from 'react';

import * as deps from '../../deps';

import Header from '../Header';
import Footer from '../Footer';
import FooterLinks from '../Footer/FooterLinks';
import Body from '../Body';
import Main from '../Main';
import Hero from '../../elements/Hero';

import SitesList from './SitesList';
import AddSiteNav from './AddSiteNav';

import DeleteModal from './DeleteModal';

const Sites = () => (
  <Body>
    <DeleteModal />
    <Header>
      <Hero
        title="Sites"
        subtitle={
          <span>
            Manage your <strong>WordPress Sites</strong> or add new ones.
          </span>
        }
      />
    </Header>

    <AddSiteNav />
    <Main waitForSelectors={[deps.selectors.getIsReadySites]}>
      <SitesList />
    </Main>

    <Footer>
      <FooterLinks />
    </Footer>
  </Body>
);

export default Sites;
