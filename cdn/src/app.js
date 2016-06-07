import express from 'express';
import mongodb from 'express-mongo-db';
import config from './config.json';
import settings from './settings';

const app = express();

app.use(mongodb(config.mongoUrl));
app.use('/settings', settings);

export default app;
