import express from 'express';
import settings from './settings';

const app = express();

app.use('/settings', settings);

app.get('/', (req, res) => {
  res.send('Worona CDN working.');
});

export default app;
