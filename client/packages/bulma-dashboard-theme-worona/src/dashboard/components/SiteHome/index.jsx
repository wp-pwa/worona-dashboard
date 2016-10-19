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

const SiteHome = ({ site }) => (
  <Body>
    <Header waitForSubscriptions={[deps.selectors.getIsReadySites]}>
      <Hero title={site.name}>
        <small>{site.id}</small>
        <br />
        <small>{site.url}</small>
      </Hero>
      <ServiceTabs />
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

const mapStateToProps = (state) => ({
  site: deps.selectors.getSelectedSite(state),
});

SiteHome.propTypes = {
  site: React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
    id: React.PropTypes.string.isRequired,
    url: React.PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(SiteHome);
