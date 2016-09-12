import { isRemote } from 'worona-deps';
import React from 'react';
import { connect } from 'react-redux';
import * as deps from '../../dependencies';

class LinkCss extends React.Component {
  componentDidMount() {
    this.refs.link.addEventListener('load', this.props.assetsFileDownloaded);
  }
  render() {
    const { cdn, path } = this.props;
    return (
      <link rel="stylesheet" ref="link" type="text/css" href={`${cdn}${path}`} />
    );
  }
}
LinkCss.propTypes = ({
  cdn: React.PropTypes.string.isRequired,
  path: React.PropTypes.string.isRequired,
  assetsFileDownloaded: React.PropTypes.func.isRequired,
});


const mapDispatchToProps = (dispatch, { path, pkgName }) => ({
  assetsFileDownloaded: () =>
    dispatch(deps.actions.packageAssetFileDownloaded({ path, pkgName, assetType: 'css' })),
});

LinkCss = connect(null, mapDispatchToProps)(LinkCss);

export const CssLoader = ({ cssAssets }) => {
  const cdn = isRemote ? 'https://cdn.worona.io/packages/' : 'https://localhost:4000/packages/';
  return (
    <div>
      {cssAssets.map(asset =>
        <LinkCss cdn={cdn} pkgName={asset.pkgName} path={asset.path} key={asset.path} />
      )}
    </div>
  );
};

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
