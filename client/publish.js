/* eslint-disable no-console, global-require, import/no-dynamic-require */
import { spawn } from 'child-process-promise';
import request from 'superagent';
import fs from 'fs';
import path from 'path';
import semver from 'semver';

const getPackageVersion = async (name) => {
  const res = await request(`https://registry.npmjs.org/${name}`);
  return res.body['dist-tags'].latest;
};

const getDirectories = srcpath =>
  fs.readdirSync(srcpath).filter(file =>
    fs.statSync(path.join(srcpath, file)).isDirectory());

const publish = async ({ folder }) => {
  const directories = getDirectories(`./${folder}/`);

  for (let i = 0; i < directories.length; i += 1) {
    const name = directories[i];
    const localVersion = require(`./${folder}/${name}/package.json`).version;
    const remoteVersion = await getPackageVersion(name);

    if (semver.gt(localVersion, remoteVersion)) {
      console.log(`\nUpdating package '${name}' from ${remoteVersion} to ${localVersion}...`);
      await spawn('npm', ['publish', `${folder}/${name}`], { stdio: 'inherit' });
    } else {
      console.log(`\nPackage '${name}' is already up to date: ${localVersion}.`);
    }
  }
};

process.on('unhandledRejection', (err) => {
  console.log(err.stack);
  process.exit(1);
});

const start = async () => {
  await publish({ folder: 'packages' });
  await publish({ folder: 'development' });
  console.log('\n');
};

start();
