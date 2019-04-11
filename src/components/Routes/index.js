import React from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';
import { default as Home } from '../Home';

const Routes = () => (
  <Switch>
    <Route exact path='/'>
      <Home />
    </Route>
    <Route exact path='/menu'>
      <Home appMenuOpen />
    </Route>
    <Route exact path='/test-message'>
      <Home testMessageOpen />
    </Route>
  </Switch>
);

const RoutesContainer = withRouter(Routes);

export default RoutesContainer;
