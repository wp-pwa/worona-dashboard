import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Center from './Container.jsx';
import Input from '../Input/index.jsx';

storiesOf('Input', module)
  .add('type="text"', () => (
    <Center>
      <Input type="text" />
    </Center>
  ))
  .add('... value="Some value"', () => (
    <Center>
      <Input type="text" value="Some value" />
    </Center>
  ))
  .add('... placeholder="Some placeholder"', () => (
    <Center>
      <Input type="text" placeholder="Some placeholder" />
    </Center>
  ))
  .add('... label="Some label"', () => (
    <Center>
      <Input type="text" label="Some label" />
    </Center>
  ))
  .add('... color="primary"', () => (
    <Center>
      <Input type="text" color="primary" />
    </Center>
  ))
  .add('... color="info"', () => (
    <Center>
      <Input type="text" color="info" />
    </Center>
  ))
  .add('... color="success"', () => (
    <Center>
      <Input type="text" color="success" />
    </Center>
  ))
  .add('... color="danger"', () => (
    <Center>
      <Input type="text" color="danger" />
    </Center>
  ))
  .add('... color="warning"', () => (
    <Center>
      <Input type="text" color="warning" />
    </Center>
  ))
  .add('... icon="lock"', () => (
    <Center>
      <Input type="text" icon="lock" />
    </Center>
  ))
  .add('... ... label="Password"', () => (
    <Center>
      <Input type="text" label="Password" icon="lock" />
    </Center>
  ))
  .add('... ... ... color="danger"', () => (
    <Center>
      <Input type="text" label="Password" icon="lock" color="danger" />
    </Center>
  ))
  .add('... size="small"', () => (
    <Center>
      <Input type="text" size="small" />
    </Center>
  ))
  .add('... size="medium"', () => (
    <Center>
      <Input type="text" size="medium" />
    </Center>
  ))
  .add('... size="large"', () => (
    <Center>
      <Input type="text" size="large" />
    </Center>
  ))
  .add('... help="Some help"', () => (
    <Center>
      <Input type="text" help="Some help" />
    </Center>
  ))
  .add('... ... color="danger"', () => (
    <Center>
      <Input type="text" color="danger" help="Some help" />
    </Center>
  ))
  .add('... ... color="success"', () => (
    <Center>
      <Input type="text" color="success" help="Some help" />
    </Center>
  ))
  .add('... ... ... size="medium"', () => (
    <Center>
      <Input type="text" color="success" help="Some help" size="medium" />
    </Center>
  ));
