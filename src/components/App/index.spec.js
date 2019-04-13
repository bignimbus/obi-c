import React from 'react';
import ReactDOM from 'react-dom';
import App from '.';
import ClockContext from '../../contexts/ClockContext';
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
      <ClockContext.Provider
        value={{
          removeEvent: jest.fn(),
          activeNotifications: [],
        }}
      >
        <App />
      </ClockContext.Provider>
    </BlockstackContext.Provider>
  );
  ReactDOM.render(
    <AppWithContext />,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
