/* eslint-disable no-console */
import path from 'path';
import { argv as config } from 'yargs';
import { sync as rimrafSync } from 'rimraf';
import { spawn } from 'child-process-promise';

const start = async () => {
  const env = config.env || 'dev';
  const location = config.location || 'local';

  // Reset dist folder.
  rimrafSync('dist/**/*');

  // Update all packages.
  console.log('Checking if you are up-to-date with npm. Please wait...\n');
  const recursiveInstall = spawn('../node_modules/.bin/npm-recursive-install');
  const childProcess = recursiveInstall.childProcess;
  childProcess.stdout.on('data', data => {
    if (data.toString() !== '\n') console.log(data.toString().replace('...\n', '...'));
  });
  childProcess.stderr.on('data', data => {
    if (/ERR/.test(data.toString())) console.log(data.toString());
  });
  await recursiveInstall;
  console.log('\nEverything is fine. Let\'s run webpack.\n');

  // Generate vendors.
  await spawn('./node_modules/.bin/webpack', [
    '--config', '../../webpack.config.js',
    '--progress',
    '--name', 'vendors-dashboard-worona',
    '--entrie', 'dashboard',
    '--type', 'vendors',
    '--env', env,
  ], { cwd: path.resolve('packages', 'vendors-dashboard-worona'), stdio: 'inherit' });

  // Run webpack-dev-server.
  const webpack = config.build ? 'webpack' : 'webpack-dev-server';
  await spawn(`./node_modules/.bin/${webpack}`, ['--config', 'webpack.config.js',
    '--name', 'core-dashboard-worona',
    '--entrie', 'dashboard',
    '--type', 'core',
    '--env', env,
    '--location', location,
  ], { stdio: 'inherit' });
};

process.on('unhandledRejection', (err) => {
  console.log(err.stack);
  process.exit(1);
});

start();
