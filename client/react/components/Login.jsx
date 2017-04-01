/*----------Modules----------*/
import React from 'react';
import $ from 'jquery';

/*----------Components----------*/
import Header from 'Header';

/*eslint-disable require-jsdoc*/
export class Login extends React.Component {
  constructor() {
    super();
  }
  submit = (e) => {
    e.preventDefault();
    console.log(this.refs);
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
  register = (e) => {
    e.preventDefault();
    $.get('/register');
  }
  render() {
    return (
      <div>
        <Header/>
        <div className='login container'>
          <div className='row'>
            <div className='col-xs-12'>
              <h1>Login</h1>
              <form className='form' method='post'>
                <div className='form-group'>
                  <label>Email</label>
                  <input
                    type='email'
                    name='email'
                    ref='email'
                    className='form-control'
                    required
                    autoComplete='off'/>
                </div>
                <div className='form-group'>
                  <label>Password</label>
                  <input
                    type='password'
                    name='password'
                    ref='password'
                    className='form-control'
                    required
                    autoComplete='off'/>
                </div>
                <div className='form-group'>
                  <button onClick={this.submit} className='btn btn-default'>Login</button>
                  <button onClick={this.register} className='btn btn-info'>Sign up</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
