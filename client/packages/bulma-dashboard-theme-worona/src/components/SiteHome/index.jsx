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

const SiteHome = ({ params, site: { name, url } }) => (
  <Body>
    <Header>
      <TopNav />
      <Hero title={name}>
        <small>{params.siteId}</small>
        <br />
        <small>{url}</small>
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

const mapStateToProps = (state, ownProps) =>
  ({ site: deps.selectors.getSiteInfo(ownProps.params.siteId)(state) });

SiteHome.propTypes = {
  params: React.PropTypes.object.isRequired,
  site: React.PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(SiteHome);
