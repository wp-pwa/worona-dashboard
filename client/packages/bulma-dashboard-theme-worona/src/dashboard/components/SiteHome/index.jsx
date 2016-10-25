import React from 'react';
import { connect } from 'react-redux';

import Header from '../Header';
import Footer from '../Footer';
import FooterLinks from '../Footer/FooterLinks';
import Body from '../Body';
import Main from '../Main';
import Hero from '../elements/Hero';
import * as deps from '../../deps';

import ServiceTabs from './ServiceTabs';
import AsideMenu from './AsideMenu';

/* Header */
let SiteHomeHeader = ({ site }) => (
  <div>
    <Hero title={site.name}>
      <small>{site.id}</small>
      <br />
      <small>{site.url}</small>
    </Hero>
    <ServiceTabs />
  </div>
);

const mapStateToProps = (state) => ({
  site: deps.selectors.getSelectedSite(state),
});

SiteHomeHeader.propTypes = {
  site: React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
    id: React.PropTypes.string.isRequired,
    url: React.PropTypes.string.isRequired,
  }),
};

SiteHomeHeader = connect(mapStateToProps)(SiteHomeHeader);

const SiteHome = () => (
  <Body>
    <Header waitForSubscriptions={[deps.selectors.getIsReadySites]}>
      <SiteHomeHeader />
    </Header>

    <Main waitForSubscriptions={[deps.selectors.getIsReadySettings]}>
      <div className="columns is-mobile" >
        <AsideMenu />
        {/* <PackageContent /> */}
      </div>
    </Main>

    <Footer>
      <FooterLinks />
    </Footer>
  </Body>
);

export default SiteHome;
