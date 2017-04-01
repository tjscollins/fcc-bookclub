/*----------Modules----------*/
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

/*----------Components----------*/

/*----------Redux----------*/
import * as actions from 'actions';

export class Header extends Component {
  constructor() {
    super();
  }
  navbarRight(userSession) {
    if (userSession.xAuth) {
      return (
        <ul className='nav navbar-nav navbar-right'>
          <li
            className={window.location.pathname == '/booklist'
              ? 'active'
            : ''}>
            <Link to='/booklist'>
              All Books
            </Link>
          </li>
          <li
            className={window.location.pathname == '/mybooks'
              ? 'active'
            : ''}>
            <Link to='/mybooks'>
              My Books
            </Link>
          </li>
          <li>
            <Link to='/settings'>
              <i className='fa fa-cog' />
            </Link>
          </li>
          <li>
            <a href='/logout'>
              <i className='fa fa-sign-out' />
            </a>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className='nav navbar-nav navbar-right'>
          <li
            className={window.location.pathname == '/register'
              ? 'active'
            : ''}>
            <Link to='/register'>
              Sign up
            </Link>
          </li>
          <li
            className={window.location.pathname == '/login'
              ? 'active'
            : ''}>
            <Link to='/login'>
              Login
            </Link>
          </li>
        </ul>
      );
    }
  }
  render() {
    const {dispatch, userSession} = this.props;
    return (
      <nav className='navbar navbar-default'>
        <div className='container'>
          <div className='navbar-header'>
            <button
              type='button'
              className='navbar-toggle collapsed'
              data-toggle='collapse'
              data-target='#bs-example-navbar-collapse-1'
              aria-expanded='false'>
              <span className='sr-only'>Toggle navigation</span>
              <span className='icon-bar'/>
              <span className='icon-bar'/>
              <span className='icon-bar'/>
            </button>
            <a className='navbar-brand' href='#'>bookBazaar</a>
          </div>

          <div className='collapse navbar-collapse' id='bs-example-navbar-collapse-1'>
            <ul className='nav navbar-nav'>
              <li
                className={window.location.pathname == '/'
                ? 'active'
                : ''}>
                <Link to='/'>
                  Home
                </Link>
              </li>
            </ul>
            {this.navbarRight(userSession)}
          </div>
        </div>
      </nav>
    );
  }
}

Header.propTypes = {
  userSession: PropTypes.object,
  dispatch: PropTypes.func
};

export default connect((state) => state)(Header);
