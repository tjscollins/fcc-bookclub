/*----------Modules----------*/
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import $ from 'jquery';

/*----------Components----------*/
import Header from 'Header';

/*----------Redux----------*/
import * as actions from 'actions';

/*eslint-disable require-jsdoc*/
export class Login extends React.Component {
  constructor() {
    super();
  }
  submit = (e) => {
    e.preventDefault();
    const {dispatch} = this.props;
    const {email, password} = this.refs;
    const request = {
      method: 'post',
      url: '/login',
      beforeSend: function(request) {
        request.setRequestHeader('Content-type', 'application/json');
      },
      data: JSON.stringify({email: email.value, password: password.value})
    };
    $
      .ajax(request)
      .done((res, status, jqXHR) => {
        dispatch(actions.login(jqXHR.getResponseHeader('x-auth'), JSON.parse(jqXHR.responseText)._id, email.value));
        this.refs.email.value = '';
        this.refs.password.value = '';
        // $('#login-modal').modal('hide');
        // $('.wrong-password').css('color', 'white');
      })
      .fail((jqXHR, status, err) => {
        console.log('Login error', jqXHR);
      //   $('.wrong-password').css('color', 'red');
      //   setTimeout(() => {
      //     $('.wrong-password').css('color', 'white');
      //   }, 1500);
      });
  }
  render() {
    return (
      <div>
        <Header />
        <div className='login container'>
          <div className='row'>
            <div className='col-xs-12'>
              <h1>Login</h1>
              <form onSubmit={this.submit} className='form' method='post'>
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
                <button onClick={this.submit} className='btn btn-default'>Login</button>
                &nbsp;
                <Link to='/register'>
                  <button className='btn btn-info'>Sign up</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func,
};

export default connect((state) => state)(Login);
