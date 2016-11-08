import JSZip from 'jszip';
import FileSaver from 'file-saver';
import JSZipUtils from 'jszip-utils';
import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import * as types from '../types';
import * as actions from '../actions';
// import generateConfigXML from '../templates/config.xml.js';

// export const requestFunc = () => request
//   .get('https://worona.imgix.net/sites/undefined/icon/2fc7dbf0-cf1d-4baa-b983-fcda378def82_Tux_saying_Akronix_from_terminal_(avatar).png');

const url = 'https://worona.imgix.net/sites/undefined/icon/2fc7dbf0-cf1d-4baa-b983-fcda378def82_Tux_saying_Akronix_from_terminal_(avatar).png'

export const requestFunc = url => new Promise((resolve, reject) => {
  JSZipUtils.getBinaryContent(url, (err, data) => {
    if (err) reject(err);
    else resolve(data);
  });
});


function createZipFile(siteId, icon) {
  /* Creating the zip file */
  const zip = new JSZip();
  const www = zip.folder('www');
  www.file('index.html', '<html>Hello world</html>');
  www.file('config.xml', '<widget>Hello world</widget>');
  www.file('icon.png', icon, { binary: true });
  return zip;
}

export function* publishSiteSaga(action) {
  // try {
  const { siteId } = action;
  const data = yield call(requestFunc, url);
  const zip = createZipFile(siteId, data);
  const content = yield zip.generateAsync({ type: 'blob' });
  FileSaver.saveAs(content, 'example.zip');
  yield put(actions.publishSiteSucceed());
  // } catch (error) {
  //   yield put(actions.publishSiteFailed(error));
  // }

  /* send zip to phonegap build */
}

export function* publishSiteWatcher() {
  yield [
    takeLatest(types.PUBLISH_SITE_REQUESTED, publishSiteSaga),
  ];
}
