import React from 'react';
import { connect } from 'react-redux';
import * as deps from '../../deps';

class LinkCssClass extends React.Component {
  componentDidMount() {
    this.linkElement.addEventListener('load', this.props.assetsFileDownloaded);
    this.linkElement.addEventListener('error', this.props.assetsFileDontDownloaded);
  }
  render() {
    return (
      <link
        rel="stylesheet" ref={linkElement => { this.linkElement = linkElement; }} type="text/css"
        href={this.props.path}
      />
    );
  }
}
LinkCssClass.propTypes = ({
  path: React.PropTypes.string.isRequired,
  assetsFileDownloaded: React.PropTypes.func.isRequired,
  assetsFileDontDownloaded: React.PropTypes.func.isRequired,
});


const mapDispatchToProps = (dispatch, { path, pkgName }) => ({
  assetsFileDownloaded: () =>
    dispatch(deps.actions.packageAssetFileDownloaded({ path, pkgName, assetType: 'css' })),
  assetsFileDontDownloaded: () =>
    dispatch(deps.actions.packageAssetFileDontDownloaded({ path, pkgName, assetType: 'css' })),
});

const LinkCss = connect(null, mapDispatchToProps)(LinkCssClass);

const CssLoader = ({ cssAssets }) =>
  <div>
    {cssAssets.map(asset =>
      <LinkCss pkgName={asset.pkgName} path={asset.path} key={asset.path} />
    )}
  </div>
;

CssLoader.propTypes = {
  cssAssets: React.PropTypes.arrayOf(React.PropTypes.shape({
    path: React.PropTypes.string,
    pkgName: React.PropTypes.string,
  })).isRequired,
};

export const mapStateToProps = state => ({
  cssAssets: deps.selectors.getCssAssets(state),
});

export default connect(mapStateToProps)(CssLoader);
