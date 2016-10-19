/* eslint-disable no-console */
import { spawn } from 'child-process-promise';
import settings from './settings-development.json';

const start = async () => {
  process.env.MONGO_URL = settings.MONGO_URL;
  await spawn('meteor', ['--settings', 'settings-development.json'], { stdio: 'inherit' });
};

process.on('unhandledRejection', (err) => {
  console.log(err.stack);
  process.exit(1);
});

start();
