import React from 'react';

import Header from '../Header';
import TopNav from '../Header/TopNav';
import Footer from '../Footer';
import FooterLinks from '../Footer/FooterLinks';
import Body from '../Body';
import Main from '../Main';
import Hero from '../elements/Hero';
import * as deps from '../../dependencies';
import { connect } from 'react-redux';

import ServiceTabs from './ServiceTabs';
import AsideMenu from './AsideMenu';

const SiteHome = ({ siteId, siteInfo }) => (
  <Body>
    <Header>
      <TopNav />
      <Hero title={siteInfo.name}>
        <small>{siteId}</small>
        <br />
        <small>{siteInfo.url}</small>
      </Hero>
      <ServiceTabs />
    </Header>

    <Main>
      <div className="columns is-mobile" >
      {/* <PackageContent /> */}
      <AsideMenu />
      </div>
    </Main>

    <Footer>
      <FooterLinks />
    </Footer>
  </Body>
);

const mapStateToProps = (state) => {
  const siteId = deps.selectors.getSiteId(state);
  const siteInfo = Object.assign({}, { siteId }, deps.selectors.getSiteInfo(siteId)(state));
  return ({ siteId, siteInfo });
};

SiteHome.propTypes = {
  siteId: React.PropTypes.string.isRequired,
  siteInfo: React.PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(SiteHome);
