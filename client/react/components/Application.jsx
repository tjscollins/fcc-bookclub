/*----------React----------*/
import React from 'react';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

/*----------Components----------*/
import Index from 'Index';
import Login from 'Login';
import RouteContainer from 'RouteContainer';
import Register from 'Register';


/**
 * Main Application React Component Class to Route within SPA
 */
export class Application extends React.Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path='/' component={RouteContainer}>
          <IndexRoute component={Index} />
          <Route path='login' component={Login} />
          <Route path='register' component={Register} />
        </Route>
      </Router>
    );
  }
}

export default Application;
