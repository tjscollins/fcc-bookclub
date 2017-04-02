/*----------Modules----------*/
import React, {PropTypes, Component} from 'react';
import {Link, browserHistory} from 'react-router';
import {connect} from 'react-redux';

/*----------Components----------*/
import Header from 'Header';

/*----------Redux----------*/
import * as actions from 'actions';

export class Register extends Component {
  constructor() {
    super();
  }
  submit = (e) => {
    e.preventDefault();
    const {dispatch} = this.props;
    const {email, password, name} = this.refs;
    const request = {
      method: 'post',
      url: '/register',
      beforeSend: function(request) {
        request.setRequestHeader('Content-type', 'application/json');
      },
      data: JSON.stringify({email: email.value, password: password.value, name: name.value})
    };
    $
      .ajax(request)
      .done((res, status, jqXHR) => {
        dispatch(actions.login(jqXHR.getResponseHeader('x-auth'), JSON.parse(jqXHR.responseText)._id, email.value));
        this.refs.email.value = '';
        this.refs.password.value = '';
        browserHistory.push('/');
      })
      .fail((jqXHR, status, err) => {
        console.error('Registration error', jqXHR);
      });
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
Register.propTypes = {
  dispatch: PropTypes.func,
};

export default connect((state) => state)(Register);
