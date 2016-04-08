/* eslint-disable semi */
import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Center from './Container.jsx';
import Button from '../Button/index.jsx';

storiesOf('Button', module)
  .add('basic', () => (
    <Center>
      <Button>
        The basic button
      </Button>
    </Center>
  ))
  .add('center', () => (
    <Center>
      <Button center>
        The centered button
      </Button>
    </Center>
  ))
  .add('color="primary"', () => (
    <Center>
      <Button color="primary">
        The primary button
      </Button>
    </Center>
  ))
  .add('color="info"', () => (
    <Center>
      <Button color="info">
        The info button
      </Button>
    </Center>
  ))
  .add('color="danger"', () => (
    <Center>
      <Button color="danger">
        The danger button
      </Button>
    </Center>
  ))
  .add('color="success"', () => (
    <Center>
      <Button color="success">
        The success button
      </Button>
    </Center>
  ))
  .add('color="warning"', () => (
    <Center>
      <Button color="warning">
        The warning button
      </Button>
    </Center>
  ))
  .add('color="link"', () => (
    <Center>
      <Button color="link">
        The link button
      </Button>
    </Center>
  ))
  .add('size="small"', () => (
    <Center>
      <Button size="small">
        The small button
      </Button>
    </Center>
  ))
  .add('size="medium"', () => (
    <Center>
      <Button size="medium">
        The medium button
      </Button>
    </Center>
  ))
  .add('size="large"', () => (
    <Center>
      <Button size="large">
        The large button
      </Button>
    </Center>
  ))
  .add('outlined color="primary"', () => (
    <Center>
      <Button outlined color="primary">
        The primary outlined button
      </Button>
    </Center>
  ))
  .add('outlined color="info"', () => (
    <Center>
      <Button outlined color="info">
        The info outlined button
      </Button>
    </Center>
  ))
  .add('outlined color="danger"', () => (
    <Center>
      <Button outlined color="danger">
        The danger outlined button
      </Button>
    </Center>
  ))
  .add('onClick=...', () => (
    <Center>
      <Button onClick={action('button clicked')}>
        The onClick button
      </Button>
    </Center>
  ))
  .add('loading', () => (
    <Center>
      <Button loading>
        The loading button
      </Button>
    </Center>
  ))
  .add('disabled', () => (
    <Center>
      <Button disabled>
        The disabled button
      </Button>
    </Center>
  ))
  .add('... color="success"', () => (
    <Center>
      <Button disabled color="success">
        The disabled success button
      </Button>
    </Center>
  ))
  .add('... ... loading', () => (
    <Center>
      <Button disabled loading color="success">
        The button
      </Button>
    </Center>
  ))
  .add('animate="shake"', () => (
    <Center>
      <Button animate="shake">
        The shake animated button
      </Button>
    </Center>
  ))
  .add('animate="wobble"', () => (
    <Center>
      <Button animate="wobble">
        The wobble animated button
      </Button>
    </Center>
  ))
