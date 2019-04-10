import React from 'react';
import ReactDOM from 'react-dom';
import App from '.';
import BlockstackContext from '../../contexts/BlockstackContext';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const AppWithContext = () => (
    <BlockstackContext.Provider
      value={{
        user: null,
        signIn: jest.fn(),
        authState: 'foo',
      }}
    >
      <App />
    </BlockstackContext.Provider>
  );
  ReactDOM.render(
    <AppWithContext />,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
