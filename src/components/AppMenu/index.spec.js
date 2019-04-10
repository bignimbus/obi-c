import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import BlockstackContext from '../../contexts/BlockstackContext';
import { default as AppMenu } from '.';

const renderComponent = contextValue => renderer.create(
  <BlockstackContext.Provider value={contextValue}>
    <MemoryRouter>
      <AppMenu />
    </MemoryRouter>
  </BlockstackContext.Provider>,
);

describe('AppMenu', () => {
  describe('#render', () => {
    test('unauthenticated user', () => {
      const element = renderComponent({
        user: null,
        signIn: jest.fn(),
        authState: 'pending',
      });
      expect(element.toJSON()).toMatchSnapshot();
    });

    test('authenticated user fetching data', () => {
      const element = renderComponent({
        user: null,
        signIn: jest.fn(),
        authState: 'loading',
      });
      expect(element.toJSON()).toMatchSnapshot();
    });

    test('authenticated user', () => {
      const element = renderComponent({
        user: {
          givenName: jest.fn(() => 'Jeff'),
        },
        signIn: jest.fn(),
        authState: 'authenticated',
      });
      expect(element.toJSON()).toMatchSnapshot();
    });
  });
});
