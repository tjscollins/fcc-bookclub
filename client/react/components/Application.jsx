/*----------React----------*/
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

/*----------Components----------*/
import BookList from 'BookList';
import Index from 'Index';
import Login from 'Login';
import MyBooks from 'MyBooks';
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
          <Route exact path='login' component={Login} />
          <Route exact path='register' component={Register} />
          <Route exact path='booklist' component={BookList} />
          <Route exact path='mybooks' component={MyBooks} />
        </Route>
      </Router>
    );
  }
}

Application.propTypes = {
    userSession: PropTypes.object,
};

export default connect((state) => state)(Application);
