import './utils/fontSize';

import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';

import { Home } from './containers';

ReactDOM.render(
  <HashRouter>
    <Switch>
      <Route exact path="/" component={Home} />
    </Switch>
  </HashRouter>,
  document.getElementById('root'),
);

// Hot Module Replacement
if (module.hot) {
  module.hot.accept();
}
