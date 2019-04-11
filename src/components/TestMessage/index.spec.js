import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import { default as TestMessage } from '.';

const renderComponent = () => renderer.create(
  <MemoryRouter>
    <TestMessage />
  </MemoryRouter>
);

describe('TestMessage', () => {
  test('pending', () => {
  });
});
