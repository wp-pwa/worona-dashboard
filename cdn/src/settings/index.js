/* eslint-disable new-cap */
import express from 'express';
import dashboardCore from './dashboard-core';

export default express.Router()
  .get('/dashboard-core.json', dashboardCore)
;
