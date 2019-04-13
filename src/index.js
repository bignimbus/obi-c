import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { ClockContextProvider } from './contexts/ClockContext';
import { BlockstackContextProvider } from './contexts/BlockstackContext';
import * as serviceWorker from './serviceWorker';

const AppWithContext = () => (
  <BlockstackContextProvider>
    <ClockContextProvider>
      <App />
    </ClockContextProvider>
  </BlockstackContextProvider>
);

ReactDOM.render(
  <AppWithContext />,
  document.getElementById('root'),
);

serviceWorker.register();
