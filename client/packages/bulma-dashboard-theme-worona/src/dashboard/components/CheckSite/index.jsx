import React from 'react';
import { connect } from 'react-redux';

import * as deps from '../../dependencies';

import Header from '../Header';
import Footer from '../Footer';
import FooterLinks from '../Footer/FooterLinks';
import Body from '../Body';
import Main from '../Main';
import Hero from '../elements/Hero';

import { Check } from './Check';

/* Header */
let CheckSiteHeader = ({ site }) => (
  <Hero title={site.name}>
    <small>{site.id}</small>
    <br />
    <small>{site.url}</small>
  </Hero>
);

const mapStateToProps = (state) => ({
  site: deps.selectors.getSelectedSite(state),
});

CheckSiteHeader.propTypes = {
  site: React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
    id: React.PropTypes.string.isRequired,
    url: React.PropTypes.string.isRequired,
  }),
};

CheckSiteHeader = connect(mapStateToProps)(CheckSiteHeader);

/* CheckSite screen */
const CheckSite = () => (
  <Body>
    <Header waitForSubscriptions={[deps.selectors.getIsReadySites]}>
      <CheckSiteHeader />
    </Header>
    <Main waitForSubscriptions={[deps.selectors.getIsReadySites]}>
      <Check text="Site online and available" status="inactive" key="online" />
      <Check text="Worona WordPress Plugin" status="danger" key="plugin" />
      <Check text="Checking Site ID" status="warning" key="siteId" />
    </Main>

    <Footer>
      <FooterLinks />
    </Footer>
  </Body>
);

export default CheckSite;
