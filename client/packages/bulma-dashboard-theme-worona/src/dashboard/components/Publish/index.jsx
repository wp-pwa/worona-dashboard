import React from 'react';
import { connect } from 'react-redux';

import * as deps from '../../deps';
import Header from '../Header';
import Hero from '../elements/Hero';
import Button from '../elements/Button';
import Body from '../Body';
import Footer from '../Footer';
import FooterLinks from '../Footer/FooterLinks';
import Main from '../Main';
import ImageUploader from './ImageUploader';

let PublishButton = ({ requestPublishSite, siteId }) => (
  <Button onClick={requestPublishSite}> Publish Now </Button>
);

PublishButton.propTypes = {
  requestPublishSite: React.PropTypes.func.isRequired,
  siteId: React.PropTypes.string,
};

const mapDispatchToPublishButtonProps = (dispatch, ownProps) => ({
  requestPublishSite: () => dispatch(deps.actions.publishSiteRequested(ownProps.siteId)),
});

PublishButton = connect(null, mapDispatchToPublishButtonProps)(PublishButton);

const Publish = ({ siteId }) => (
  <Body>
    <Header>
      <Hero title="Publish your site" subtitle="publish!" />
    </Header>

    <Main>
      <ImageUploader siteId={siteId} />
      <PublishButton siteId={siteId} />
    </Main>

    <Footer>
      <FooterLinks />
    </Footer>
  </Body>
);

const mapStateToProps = (state) => ({
  siteId: deps.selectors.getSelectedSiteId(state),
});

Publish.propTypes = {
  siteId: React.PropTypes.string,
};

export default connect(mapStateToProps)(Publish);
