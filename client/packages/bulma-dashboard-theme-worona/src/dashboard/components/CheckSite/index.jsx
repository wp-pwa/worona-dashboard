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
let CheckSiteHeader = ({ name, id, url, isEditable = true }) => (
  <Hero
    title={(
      <span>
        {name}
        &nbsp;
        {isEditable && <EditSiteLink id={id} />}
      </span>
    )}
    subtitle={
      <span>
        <small>{id}</small>
        <br />
        <small>{url}</small>
      </span>
    }
  />
);

const mapStateToProps = (state) => ({
  ...deps.selectors.getSelectedSite(state),
});

CheckSiteHeader.propTypes = {
  name: React.PropTypes.string.isRequired,
  id: React.PropTypes.string.isRequired,
  url: React.PropTypes.string.isRequired,
  isEditable: React.PropTypes.bool,
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
      <Check text="WordPress REST API" checkType="wpapi" />
    </Main>

    <Footer>
      <FooterLinks />
    </Footer>
  </Body>
);

export default CheckSite;
