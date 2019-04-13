import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import { default as Routes } from '.';
import ClockContext from '../../contexts/ClockContext';
import BlockstackContext from '../../contexts/BlockstackContext';

const renderComponent = route => renderer.create(
  <BlockstackContext.Provider
    value={{
      user: null,
      signIn: jest.fn(),
      authState: 'foo',
    }}
  >
    <ClockContext.Provider
      value={{
        removeEvent: jest.fn(),
        activeNotifications: [],
      }}
    >
      <MemoryRouter initialEntries={[route]}>
        <Routes />
      </MemoryRouter>
    </ClockContext.Provider>
  </BlockstackContext.Provider>,
);

describe('Routes', () => {
  test('/', () => {
    const element = renderComponent('/');
    expect(element.toJSON()).toMatchSnapshot();
  });

  test('/menu', () => {
    const element = renderComponent('/menu');
    expect(element.toJSON()).toMatchSnapshot();
  });
});
