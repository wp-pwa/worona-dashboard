import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Center from './Container';
import MenuItem from '../MenuItem';

storiesOf('MenuItem', module)
  .add('type="text"', () => (
    <Center>
      <MenuItem type="text" />
    </Center>
  ))
