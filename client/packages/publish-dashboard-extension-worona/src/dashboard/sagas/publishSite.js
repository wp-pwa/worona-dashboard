import JSZip from 'jszip';
import FileSaver from 'file-saver';
import JSZipUtils from 'jszip-utils';
import { takeLatest } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';

import * as deps from '../deps';
import * as types from '../types';
import * as actions from '../actions';
import generateConfigXML from '../templates/config.xml.js';
import images from '../templates/images.js';

// export const requestFunc = () => request
//   .get('https://worona.imgix.net/sites/undefined/icon/2fc7dbf0-cf1d-4baa-b983-fcda378def82_Tux_saying_Akronix_from_terminal_(avatar).png');

export const requestFunc = url => new Promise((resolve, reject) => {
  JSZipUtils.getBinaryContent(url, (err, data) => {
    if (err) reject(err);
    else resolve(data);
  });
});

function getImages(siteId, iconId) {
  const baseUrl = (iconId) ? // If user doesn't provide an icon we user Worona images.
  `https://worona.imgix.net/sites/${siteId}/icon/${iconId}`
  : 'http://worona.imgix.net/splashes/watermark/logo-1024.png';
  const imageRequests = images.map(({ query }) => requestFunc(baseUrl + query));
  return Promise.all(imageRequests);
}


function createZipFile(siteId, site, user, imagesData) {
  /* Creating the zip file */
  const zip = new JSZip();
  const www = zip.folder('www');

  /* Generate index.html file */
  www.file('index.html', '<html>Hello world</html>');

  /* Generate config.xml file */
  const configParams = {
    appId: siteId,
    appName: site.name,
    siteURL: site.url,
    userEmail: user.email,
    userName: user.name,
    siteId,
  };
  const xmlFile = generateConfigXML(configParams);
  www.file('config.xml', xmlFile);

  /* Default icon */
  www.file('icon.png', imagesData[0], { binary: true });

  /* Platform icons and screens */
  images.forEach((item, index) => {
    if (item.platform) {
      return www.file(
        `res/icon/${item.platform}/${item.fileName}`,
        imagesData[index],
        { binary: true }
      );
    }
  });

  return zip;
}

export function* publishSiteSaga(action) {
  // try {
  const { siteId } = action;
  const site = yield select(deps.selectors.getSite(siteId));
  if (site.id !== siteId) throw new Error('Trying to publish a site different than the current one.');
  const user = yield select(deps.selectors.getNameAndEmail);
  yield put(actions.publishSiteStatusChanged('Downloading images...'));
  const imagesData = yield call(getImages, siteId, site.iconId);
  yield put(actions.publishSiteStatusChanged('All images dowloaded!'));
  yield put(actions.publishSiteStatusChanged('Generating zip file...'));
  const zip = createZipFile(siteId, site, user, imagesData);
  const content = yield zip.generateAsync({ type: 'blob' });
  yield put(actions.publishSiteStatusChanged('Zip generated!'));
  FileSaver.saveAs(content, 'example.zip');
  yield put(actions.publishSiteStatusChanged('Zip downloaded!'));
  yield put(actions.publishSiteSucceed());
  // } catch (error) {
  //   yield put(actions.publishSiteFailed(error));
  // }
}

export function* publishSiteWatcher() {
  yield [
    takeLatest(types.PUBLISH_SITE_REQUESTED, publishSiteSaga),
  ];
}
