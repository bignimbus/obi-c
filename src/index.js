import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { BlockstackContextProvider } from './contexts/BlockstackContext';
import * as serviceWorker from './serviceWorker';

const AppWithContext = () => (
  <BlockstackContextProvider>
    <App />
  </BlockstackContextProvider>
);

ReactDOM.render(
  <AppWithContext />,
  document.getElementById('root'),
);

serviceWorker.register();
