/* eslint-disable new-cap */
import express from 'express';
import dashboardCore from './dashboard-core';

export default express.Router()
  .get('/', (req, res) => res.send('Worona CDN working.'))
  .get('/:environment/dashboard-core.json', dashboardCore)
;
