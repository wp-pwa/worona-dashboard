import JSZip from 'jszip';
import FileSaver from 'file-saver';
import JSZipUtils from 'jszip-utils';
import { takeLatest } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';

import indexHtml from 'raw!../templates/index.html';
import indexJs from 'raw!../templates/index.js';
import * as deps from '../deps';
import * as types from '../types';
import * as actions from '../actions';
import generateConfigXML from '../templates/config.xml.js';
import generateImagesArray from '../templates/images.js';


function getImagesArray(siteId, iconId) {
  const baseUrl = (iconId) ? // If user doesn't provide an icon we user Worona images.
    `http://worona.imgix.net/sites/${siteId}/icon/${iconId}`
    :
    'http://worona.imgix.net/splashes/watermark/logo-1024.png';
  return generateImagesArray(baseUrl);
}

export const requestFunc = url => new Promise((resolve, reject) => {
  JSZipUtils.getBinaryContent(url, (err, data) => {
    if (err) reject(err);
    else resolve(data);
  });
});

function getAllImagesPromise(images) {
  const imageRequests = images.map(({ url }) => requestFunc(url));
  return Promise.all(imageRequests);
}

function generateAppId(rawUrl) {
  const noProtocolURI = new RegExp('http[s]?://');
  const noDoubleSlashesRegExp = new RegExp('/[/]+', 'g');
  let url = rawUrl.toLowerCase();
  url = url.replace(noProtocolURI, ''); // remove http(s)://
  url = url.replace(noDoubleSlashesRegExp, '/'); // site//something -> site/something
  if (url[url.length - 1] === '/') { // remove trailing slash/
    url = url.slice(0, -1);
  }
  const directories = url.split('/');
  const domains = directories.shift().split('.');
  domains.reverse();
  const appId = domains.concat(directories.concat(['app'])).join('.');
  return appId;
}

function createZipFile(siteId, site, user, images, imagesData) {
  /* Creating the zip file */
  const zip = new JSZip();
  const www = zip.folder('www');

  /* Generate index.html file */
  www.file('index.html', indexHtml);

  /* Generate config.xml file */
  const configParams = {
    appId: generateAppId(site.url),
    appName: site.name,
    siteURL: site.url,
    userEmail: user.email,
    userName: user.name,
    siteId,
  };
  const xmlFile = generateConfigXML(configParams);
  www.file('config.xml', xmlFile);

  /* javascript code */
  const js = www.folder('js');
  js.file('index.js', indexJs);

  /* Platform icons and screens */
  images.forEach((item, index) => {
    www.file(
      `res/${item.type}/${item.platform}/${item.fileName}`,
      imagesData[index],
      { binary: true }
    );
  });

  return zip;
}

export function* publishSiteSaga(action) {
  // try {
  const { siteId } = action;
  const site = yield select(deps.selectors.getSite(siteId));
  if (site.id !== siteId) throw new Error('Trying to publish a site different than the current one.');
  const user = yield select(deps.selectors.getNameAndEmail);
  const images = getImagesArray(site.id, site.iconId);
  yield put(actions.publishSiteStatusChanged('Downloading images...'));
  const imagesData = yield call(getAllImagesPromise, images);
  yield put(actions.publishSiteStatusChanged('All images dowloaded!'));

  yield put(actions.publishSiteStatusChanged('Generating zip file...'));
  const zip = createZipFile(siteId, site, user, images, imagesData);
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
