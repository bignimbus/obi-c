import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import BlockstackContext from '../../contexts/BlockstackContext';
import { default as Home } from '.';

const renderComponent = (props = {}) => renderer.create(
  <BlockstackContext.Provider
    value={{
      user: null,
      signIn: jest.fn(),
      authState: 'foo',
    }}
  >
    <MemoryRouter>
      <Home {...props} />
    </MemoryRouter>
  </BlockstackContext.Provider>
);

describe('Home', () => {
  describe('#render', () => {
    test('app menu is open', () => {
      const element = renderComponent({ appMenuOpen: true });
      expect(element.toJSON()).toMatchSnapshot();
    });

    test('app menu is closed', () => {
      const element = renderComponent();
      expect(element.toJSON()).toMatchSnapshot();
    });
  });
});
