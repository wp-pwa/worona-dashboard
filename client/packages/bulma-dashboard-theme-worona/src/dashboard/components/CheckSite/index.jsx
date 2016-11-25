import React from 'react';
import { connect } from 'react-redux';

import * as deps from '../../deps';

import Header from '../Header';
import Footer from '../Footer';
import FooterLinks from '../Footer/FooterLinks';
import Body from '../Body';
import Main from '../Main';
import Hero from '../../elements/Hero';
import EditSiteLink from '../../elements/EditSiteLink';
import Check from './Check';

/* Header */
let CheckSiteHeader = ({ site }) => (
  <Hero
    title={(
      <span>
        {site.name}
        &nbsp;
        <EditSiteLink id={site.id} color="rgba(255,255,255,.7)" />
      </span>
    )}
    subtitle={
      <span>
        <small>{site.id}</small>
        <br />
        <small>{site.url}</small>
      </span>
    }
  />
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
    <Header waitForSelectors={[deps.selectors.getIsReadySelectedSite]}>
      <CheckSiteHeader />
    </Header>
    <Main waitForSelectors={[deps.selectors.getIsReadySelectedSite]}>
      <Check text="Site online" checkType="online" />
      <Check text="Worona WordPress Plugin" checkType="plugin" />
    </Main>

    <Footer>
      <FooterLinks />
    </Footer>
  </Body>
);

export default CheckSite;
