import './utils/fontSize';

import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';

import { Context, Topics } from './containers';

ReactDOM.render(
  <HashRouter>
    <Switch>
      <Route exact path="/context" component={Context} />
      <Route exact path="/topics" component={Topics} />
    </Switch>
  </HashRouter>,
  document.getElementById('root'),
);

// Hot Module Replacement
if (module.hot) {
  module.hot.accept();
}
