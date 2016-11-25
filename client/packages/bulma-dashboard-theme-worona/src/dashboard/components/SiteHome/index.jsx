import React from 'react';
import { connect } from 'react-redux';
import { dep } from 'worona-deps';
import Header from '../Header';
import Footer from '../Footer';
import FooterLinks from '../Footer/FooterLinks';
import Body from '../Body';
import Main from '../Main';
import Hero from '../../elements/Hero';
import EditSiteLink from '../../elements/EditSiteLink';
import * as deps from '../../deps';
import ServiceTabs from './ServiceTabs';

let SiteHomeHeader = ({ site }) => (
  <Hero
    title={(
      <span>
        {site.name}
        &nbsp;
        <EditSiteLink id={site.id} />
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
const mapSiteHeaderToState = (state) => ({
  site: deps.selectors.getSelectedSite(state),
});
SiteHomeHeader.propTypes = {
  site: React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
    id: React.PropTypes.string.isRequired,
    url: React.PropTypes.string.isRequired,
  }),
};
SiteHomeHeader = connect(mapSiteHeaderToState)(SiteHomeHeader);

let Root = ({ namespace }) => {
  const RootFromComponent = dep(namespace, 'components', 'Root');
  return <RootFromComponent />;
};
Root.propTypes = { namespace: React.PropTypes.string.isRequired };
const mapRootToState = state => ({
  namespace: deps.selectors.getSelectedPackage(state).namespace,
});
Root = connect(mapRootToState)(Root);

const SiteHome = () => (
  <Body>
    <Header waitForSelectors={[deps.selectors.getIsReadySelectedSite]}>
      <SiteHomeHeader />
      <ServiceTabs />
    </Header>

    <Main
      waitForSelectors={[
        deps.selectors.getIsReadySelectedSite,
        deps.selectors.getSelectedPackageIsActivated,
      ]}
    >
      <Root />
    </Main>

    <Footer>
      <FooterLinks />
    </Footer>
  </Body>
);

export default SiteHome;
