import React from 'react';
import { connect } from 'react-redux';
import * as deps from '../../deps';

let Content = ({ setting, tagName, catName, requestSaveSettings }) => (
  <div>
    <h3>
      Categories &amp; tag names
    </h3>
    <label htmlFor="categoryName" className="label">Category name</label>
    <div className="control is-grouped">
      <p className="control is-expanded has-icon has-icon-right">
        <input id="categoryName" className="input" type="text" placeholder={catName} />
      </p>
      <p className="control">
        <a className="button" onClick={() => requestSaveSettings(Object.assign(setting, { catName: 'category test' }))}>
          <span className="is-hidden-mobile">Change</span>
          <span className="is-hidden-tablet">
            <i className="fa fa-wrench" />
          </span>
        </a>
      </p>
    </div>
    <br />
    <label htmlFor="tagName" className="label">Tag name</label>
    <div className="control is-grouped">
      <p className="control is-expanded has-icon has-icon-right">
        <input id="tagName" className="input" type="text" placeholder={tagName} />
      </p>
      <p className="control">
        <a className="button" onClick={() => requestSaveSettings(Object.assign(setting, { tagName: 'tag test' }))}>
          <span className="is-hidden-mobile">Change</span>
          <span className="is-hidden-tablet">
            <i className="fa fa-wrench" />
          </span>
        </a>
      </p>
    </div>
    <deps.elements.Select
      size="large"
      options={[1, 2, 3, 4, 5]}
      selected={3}
    />
    <p>
      You are modififying the site: {setting.woronaInfo.siteId} <br />
      You are in the package: {setting.woronaInfo.name} <br />
      This is the setting id for this site and this package: {setting.id}
    </p>
  </div>
);

Content.propTypes = {
  requestSaveSettings: React.PropTypes.func,
  setting: React.PropTypes.object,
  tagName: React.PropTypes.string,
  catName: React.PropTypes.string,
};

const mapStateToProps = (state) => ({
  setting: deps.selectorCreators.getSettingsCreator('test-development-package-worona')(state),
  catName: deps.selectorCreators.getSettingCreator('test-development-package-worona')('catName')(state),
  tagName: deps.selectorCreators.getSettingCreator('test-development-package-worona')('tagName')(state),
});

const mapDispatchToProps = (dispatch) => ({
  requestSaveSettings: (setting) => dispatch(deps.actions.saveSettingRequested(setting)),
});

Content = connect(mapStateToProps, mapDispatchToProps)(Content);

export default () => {
  const RootContainer = deps.elements.RootContainer;
  return (
    <RootContainer mobilePreview>
      <Content />
    </RootContainer>
  );
};
