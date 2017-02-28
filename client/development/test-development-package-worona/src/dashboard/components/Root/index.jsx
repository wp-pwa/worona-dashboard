import React from 'react';
import { connect } from 'react-redux';
import * as deps from '../../deps';

let Content = ({ settings }) => (
  <p>
    You are modififying the site: {settings.woronaInfo.siteId} <br />
    You are in the package: {settings.woronaInfo.name} <br />
    This is the setting id for this site and this package: {settings.id}
  </p>
);

Content.propTypes = {
  settings: React.PropTypes.shape({}),
};

const mapStateToProps = state => ({
  settings: deps.selectorCreators.getSettings('development')(state),
  catName: deps.selectorCreators.getSetting('development', 'catName')(state),
  tagName: deps.selectorCreators.getSetting('development', 'tagName')(state),
});

Content = connect(mapStateToProps)(Content);

export default () => {
  const RootContainer = deps.elements.RootContainer;
  return (
    <RootContainer mobilePreview>
      <Content />
    </RootContainer>
  );
};
