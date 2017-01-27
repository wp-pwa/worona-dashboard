import React from 'react';

import * as deps from '../../deps';

import Header from '../Header';
import Hero from '../../elements/Hero';
import Body from '../Body';
import Footer from '../Footer';
import FooterLinks from '../Footer/FooterLinks';
import Main from '../Main';
import EditSiteForm from './EditSiteForm';
import DeleteSite from './DeleteSite';
import DeleteModal from './DeleteModal';

export const EditSite = () => (
  <Body>
    <Header>
      <Hero title="Edit Site" subtitle="Here you can change the URL or Site name." />
    </Header>

    <Main waitForSelectors={[deps.selectors.getIsReadySites]}>
      <DeleteModal />
      <EditSiteForm />
      <br />
      <DeleteSite />
    </Main>

    <Footer>
      <FooterLinks />
    </Footer>
  </Body>
);

export default EditSite;
