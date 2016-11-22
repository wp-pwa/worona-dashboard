import React from 'react';
import { connect } from 'react-redux';
import DropzoneS3Uploader from 'react-dropzone-s3-uploader';

import * as actions from '../../actions';

class ImageUploaderClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = { progress: 0 };
  }

  render() {
    const style = {
      height: 200,
      border: 'dashed 2px #999',
      borderRadius: 5,
      position: 'relative',
      cursor: 'pointer',
      width: 200,
    };
    const uploaderProps = {
      style,
      server: 'http://backend.worona.io',
      signingUrl: '/api/v1/s3/sign',
      signingUrlQueryParams: { siteId: this.props.siteId, imgType: 'icon' },
      accept: 'image/*',
      multiple: false,
      signingUrlHeaders: { additional: 'Access-Control-Allow-Origin' },
      progressComponent: () => (
        <progress className="progress is-primary" value={this.state.progress} max="100" />
      ),
    };

    const onUploadProgress = (percent) => {
      this.setState({ progress: percent });
    };

    return (
      <div className="container">
        <DropzoneS3Uploader
          onFinish={this.props.handleFinishedUpload}
          onError={this.props.handleUploadError}
          onProgress={onUploadProgress}
          {...uploaderProps}
        >
          <div>
            <p>Drop your app icon here.</p>
          </div>
        </DropzoneS3Uploader>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleFinishedUpload: (signResult) => dispatch(
    actions.uploadSucceed(signResult.filename, ownProps.siteId)
  ),
  handleUploadError: (status, file) => dispatch(actions.uploadError({ status, file })),
});

ImageUploaderClass.propTypes = {
  handleFinishedUpload: React.PropTypes.func.isRequired,
  handleUploadError: React.PropTypes.func.isRequired,
  siteId: React.PropTypes.string,
};

export default connect(null, mapDispatchToProps)(ImageUploaderClass);
