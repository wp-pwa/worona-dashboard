import express from 'express';
import extensions from './extensions';

const app = express();

app.use('/extensions', extensions);

export default app;
