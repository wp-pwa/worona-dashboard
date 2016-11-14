import JSZip from 'jszip';
import FileSaver from 'file-saver';
import JSZipUtils from 'jszip-utils';
import { takeLatest } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';

import * as deps from '../deps';
import * as types from '../types';
import * as actions from '../actions';
import generateConfigXML from '../templates/config.xml.js';

// export const requestFunc = () => request
//   .get('https://worona.imgix.net/sites/undefined/icon/2fc7dbf0-cf1d-4baa-b983-fcda378def82_Tux_saying_Akronix_from_terminal_(avatar).png');

const url = 'https://worona.imgix.net/sites/undefined/icon/2fc7dbf0-cf1d-4baa-b983-fcda378def82_Tux_saying_Akronix_from_terminal_(avatar).png';

export const requestFunc = url => new Promise((resolve, reject) => {
  JSZipUtils.getBinaryContent(url, (err, data) => {
    if (err) reject(err);
    else resolve(data);
  });
});


function createZipFile(siteId, site, user, icon) {
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
  debugger;
  www.file('config.xml', xmlFile);

  /* Generate icons */
  www.file('icon.png', icon, { binary: true });
  return zip;
}

export function* publishSiteSaga(action) {
  // try {
  const { siteId } = action;
  // const site = yield select(deps.selectors.getSite, siteId);
  const site = yield select(deps.selectors.getSelectedSite);
  if (site.id !== siteId) throw new Error('Trying to publish a site different than the current one.');
  const user = yield select(deps.selectors.getNameAndEmail);
  const icon = yield call(requestFunc, url);
  const zip = createZipFile(siteId, site, user, icon);
  const content = yield zip.generateAsync({ type: 'blob' });
  FileSaver.saveAs(content, 'example.zip');
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
