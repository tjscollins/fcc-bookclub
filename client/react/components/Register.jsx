/*----------Modules----------*/
import React from 'react';
import {Link} from 'react-router';

/*----------Components----------*/
import Header from 'Header';

export class Register extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div>
        <Header />
        <div className='login container'>
          <div className='row'>
            <div className='col-xs-12'>
              <h1>Sign up for bookBazaar</h1>
              <form className='form' method='post'>
                <div className='form-group'>
                  <label>Name</label>
                  <input
                    type='text'
                    name='name'
                    ref='name'
                    className='form-control'
                    required
                    autoComplete='off' />
                </div>
                <div className='form-group'>
                  <label>Email</label>
                  <input
                    type='email'
                    name='email'
                    ref='email'
                    className='form-control'
                    required
                    autoComplete='off' />
                </div>
                <div className='form-group'>
                  <label>Password</label>
                  <input
                    type='password'
                    name='password'
                    ref='password'
                    className='form-control'
                    required
                    autoComplete='off' />
                </div>
              </form>
              <div>
                <button onClick={this.submit} className='btn btn-default'>Sign up</button>
                &nbsp;
                <Link to='/login'>
                  <button className='btn btn-info'>
                    Login
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
