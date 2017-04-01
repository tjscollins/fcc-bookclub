/*----------Modules----------*/
import React, {Component} from 'react';

/*----------Components----------*/

export class Header extends Component {
  constructor() {
    super();
  }
  render() {
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
              <span className='icon-bar' />
              <span className='icon-bar' />
              <span className='icon-bar' />
            </button>
            <a className='navbar-brand' href='#'>bookBazaar</a>
          </div>

          <div className='collapse navbar-collapse' id='bs-example-navbar-collapse-1'>
            <ul className='nav navbar-nav'>
              <li className='active'>
                <a href='/'>Home
                  <span className='sr-only'>(current)</span>
                </a>
              </li>
            </ul>

            <ul className='nav navbar-nav navbar-right'>
              <li>
                <a href='/register'>Sign up</a>
              </li>
              <li>
                <a href='/login'>Login</a>
              </li>

            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

Header.propTypes = {

};

export default Header;
