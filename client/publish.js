/* eslint-disable no-console, global-require, import/no-dynamic-require */
import { spawn } from 'child-process-promise';
import Registry from 'npm-registry';
import fs from 'fs';
import path from 'path';
import semver from 'semver';

const npm = new Registry({ registry: 'https://registry.npmjs.org/' });

const getPackageVersion = name => new Promise((resolve, reject) => {
  npm.packages.get(name, (err, data) => {
    if (err) reject(err);
    else resolve(data[0].version);
  });
});

const getDirectories = srcpath =>
  fs.readdirSync(srcpath).filter(file =>
    fs.statSync(path.join(srcpath, file)).isDirectory());

const publish = async () => {
  const directories = getDirectories('./packages/');

  for (let i = 0; i < directories.length; i += 1) {
    const name = directories[i];
    const localVersion = require(`./packages/${name}/package.json`).version;
    const remoteVersion = await getPackageVersion(name);

    if (semver.gt(localVersion, remoteVersion)) {
      console.log(`Updating package '${name}' from ${remoteVersion} to ${localVersion}...\n`);
      await spawn('npm', ['publish', `packages/${name}`], { stdio: 'inherit' });
    } else {
      console.log(`Package '${name}' is already up to date: ${localVersion}.\n`);
    }
  }
};

process.on('unhandledRejection', (err) => {
  console.log(err.stack);
  process.exit(1);
});

publish();
