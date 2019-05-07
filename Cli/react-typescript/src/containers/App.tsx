import Home from './home';

import React, { Component } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

class App extends Component {
  public render() {
    return (
      <div className="container">
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
