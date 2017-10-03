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
import Icon from '../../elements/Icon';
import Button from '../../elements/Button';
import * as actions from '../../actions';
import MobileMenu from './MobileMenu';
import { getAppUrl } from '../../elements/MobilePreview';

let SiteHomeHeader = ({ name, id, url, isEditable = true }) => (
  <Hero
    title={
      <span>
        {name}
        &nbsp;
        {isEditable && <EditSiteLink id={id} />}
      </span>
    }
    subtitle={
      <span>
        <small>{id}</small>
        <br />
        <small>{url}</small>
      </span>
    }
  />
);
const mapSiteHeaderToState = state => ({
  ...deps.selectors.getSelectedSite(state),
});
SiteHomeHeader.propTypes = {
  name: React.PropTypes.string.isRequired,
  id: React.PropTypes.string.isRequired,
  url: React.PropTypes.string.isRequired,
  isEditable: React.PropTypes.bool,
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

let MobileMenuBar = ({ toggleSiteHomeMobileMenu, siteId, appUrl }) => (
  <nav className="nav has-shadow is-hidden-tablet">
    <div className="nav-left">
      <span className="nav-item">
        <Button onClick={toggleSiteHomeMobileMenu}>
          <Icon code="bars" small />
          <span>menu</span>
        </Button>
      </span>
    </div>
    <div className="nav-right">
      <span className="nav-item">
        <a
          target="_blank"
          href={`https://${appUrl}/?siteId=${siteId}&preview=true`}
          rel="noreferrer noopener"
          className="button is-primary"
        >
          <Icon code="eye" small />
          <span>Preview</span>
        </a>
      </span>
    </div>
    <MobileMenu />
  </nav>
);

MobileMenuBar.propTypes = {
  toggleSiteHomeMobileMenu: React.PropTypes.func.isRequired,
  siteId: React.PropTypes.string.isRequired,
  appUrl: React.PropTypes.string.isRequired,
};

const mapStateToMobileMenuProps = state => ({
  siteId: deps.selectors.getSelectedSiteId(state),
  site: deps.selectors.getSelectedSite(state),
});

const mapDispatchToMobileMenuProps = dispatch => ({
  toggleSiteHomeMobileMenu: () => dispatch(actions.toggleSiteHomeMobileMenu()),
});

const mergeProps = ({ siteId, site }, { toggleSiteHomeMobileMenu }) => ({
  siteId,
  toggleSiteHomeMobileMenu,
  appUrl: getAppUrl({ type: (typeof site === 'object' && site.type) || 'app' }),
});

MobileMenuBar = connect(mapStateToMobileMenuProps, mapDispatchToMobileMenuProps, mergeProps)(
  MobileMenuBar
);

const SiteHome = () => (
  <Body>
    <Header waitForSelectors={[deps.selectors.getIsReadySelectedSite]}>
      <SiteHomeHeader />
      <ServiceTabs />
    </Header>
    <MobileMenuBar />

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
