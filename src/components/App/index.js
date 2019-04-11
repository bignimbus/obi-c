import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { default as Routes } from '../Routes';

const App = () => (
  <div className='__one-hundred-percent'>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </div>
);

export default App;
