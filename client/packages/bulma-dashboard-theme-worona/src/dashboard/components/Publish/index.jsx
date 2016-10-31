import React from 'react';
import DropzoneS3Uploader from 'react-dropzone-s3-uploader';

import Header from '../Header';
import Hero from '../elements/Hero';
import Body from '../Body';
import Footer from '../Footer';
import FooterLinks from '../Footer/FooterLinks';
import Main from '../Main';

function ImageUploader() {
  const style = {
    height: 200,
    border: 'dashed 2px #999',
    borderRadius: 5,
    position: 'relative',
    cursor: 'pointer',
  };
  const uploaderProps = {
    style,
    maxFileSize: 1024 * 1024 * 50,
    s3Url: 'https://my-bucket.s3.amazonaws.com/',
    signingUrlQueryParams: { uploadType: 'avatar' },
    filename: 'app_icon',
  };
  debugger;
  return (
    <DropzoneS3Uploader onFinish={this.handleFinishedUpload} {...uploaderProps} />
  );
}

const Publish = () => (
  <Body>
    <Header>
      <Hero title="Publish your site" subtitle="publish!" />
    </Header>

    <Main>
      <ImageUploader />
    </Main>

    <Footer>
      <FooterLinks />
    </Footer>
  </Body>
);

export default Publish;
