import React from 'react';
import { connect } from 'react-redux';
import * as deps from '../../dependencies';

class LinkCss extends React.Component {
  componentDidMount() {
    this.refs.link.addEventListener('load', this.props.themeCssFileDownloaded);
  }
  render() {
    const { cdn, cssPath } = this.props;
    return (
      <link rel="stylesheet" ref="link" type="text/css" href={`${cdn}${cssPath}`} />
    );
  }
}
LinkCss.propTypes = ({
  cdn: React.PropTypes.string.isRequired,
  cssPath: React.PropTypes.string.isRequired,
  themeCssFileDownloaded: React.PropTypes.func.isRequired,
});
const mapDispatchToProps = (dispatch, { cssPath }) => ({
  themeCssFileDownloaded: () => dispatch(deps.actions.themeCssFileDownloaded({ file: cssPath })),
});
LinkCss = connect(null, mapDispatchToProps)(LinkCss);

export const StyleLoader = ({ css }) =>
  <div>
    {css.map(cssPath =>
      <LinkCss cdn="https://cdn.worona.io/packages/" cssPath={cssPath} key={cssPath} />
    )}
  </div>
;
StyleLoader.propTypes = {
  css: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
};

export const mapStateToProps = state => ({
  css: deps.selectors.getCss(state),
});

export default connect(mapStateToProps)(StyleLoader);
