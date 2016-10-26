/* eslint-disable no-console */
import { argv as config } from 'yargs';
import { sync as rimrafSync } from 'rimraf';
import { spawn } from 'child-process-promise';

const start = async () => {
  const env = config.env || 'dev';
  const location = config.location || 'local';
  rimrafSync('dist/**/*');

  // Generate vendors.
  await spawn('./node_modules/.bin/webpack', ['--config', 'webpack.config.js', '--progress',
    '--name', 'vendors-dashboard-worona',
    '--entrie', 'dashboard',
    '--type', 'vendors',
    '--env', env,
  ], { stdio: 'inherit' });

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
