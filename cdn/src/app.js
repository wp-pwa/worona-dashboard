import express from 'express';
import extensions from './extensions';

const app = express();

app.use('/extensions', extensions);
app.get('/', function (req, res) {
  res.send('The CDN is working');
});

export default app;
