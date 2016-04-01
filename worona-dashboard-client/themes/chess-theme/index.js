import React from 'react';
import './style.sass';
import { Header } from './Header';
import { headerItems } from './config.js';

export const Theme = () => (
  <Header items={headerItems} />
);
