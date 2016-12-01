import React from 'react';
import { connect } from 'react-redux';
import * as deps from '../../deps';

let Content = ({ setting, requestSaveSettings }) => (
  <div>
    <h3>
      Categories &amp; tag names
    </h3>
    <label htmlFor="categoryName" className="label">Category name</label>
    <div className="control is-grouped">
      <p className="control is-expanded has-icon has-icon-right">
        <input id="categoryName" className="input" type="text" placeholder="category name" />
      </p>
      <p className="control">
        <a className="button" onClick={() => requestSaveSettings(setting)}>
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
        <input id="tagName" className="input" type="text" placeholder="tag name" />
      </p>
      <p className="control">
        <a className="button">
          <span className="is-hidden-mobile">Change</span>
          <span className="is-hidden-tablet">
            <i className="fa fa-wrench" />
          </span>
        </a>
      </p>
    </div>
  </div>
);

Content.propTypes = {
  requestSaveSettings: React.PropTypes.func,
  setting: React.PropTypes.object,
};

const mapStateToProps = (state) => ({
  setting: { _id: 'Lvg2c7maZSYnyAkfk', woronaInfo: { name: 'publish-native-dashboard-extension-worona', active: true, siteId: 'yFthXcxwznWPmee5t' }, catName: 'Category Name', tagName: 'tag name' },
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
