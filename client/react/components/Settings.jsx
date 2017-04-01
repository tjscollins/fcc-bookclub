/*----------Modules----------*/
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

/*----------Components----------*/
import Header from 'Header';

export class Settings extends Component {
  changePassword() {}
  updateProfile() {}
  render() {
    return (
      <div>
        <Header />
        <div className='settings container'>
          <div className='row'>
            <div className='col-xs-12'>
              <h1>Update Profile</h1>
              <form onSubmit={this.updateProfile} className='form' method=''>
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
                  <label>City</label>
                  <input
                    type='text'
                    name='city'
                    ref='city'
                    className='form-control'
                    required
                    autoComplete='off' />
                </div>
                <div className='form-group'>
                  <label>State</label>
                  <input
                    type='text'
                    name='state'
                    ref='state'
                    className='form-control'
                    required
                    autoComplete='off' />
                </div>
                <div>
                  <button onClick={this.updateProfile} className='btn btn-primary'>Update Profile</button>
                </div>
              </form>
            </div>
          </div>

          <div className='row'>
            <div className='col-xs-12'>
              <h1>Change Password</h1>
              <form onSubmit={this.changePassword} className='form' method=''>
                <div className='form-group'>
                  <label>Current Password</label>
                  <input
                    type='password'
                    name='current-password'
                    ref='currPassword'
                    className='form-control'
                    required
                    autoComplete='off' />
                </div>
                <div className='form-group'>
                  <label>New Password</label>
                  <input
                    type='password'
                    name='new-password'
                    ref='newPassword'
                    className='form-control'
                    required
                    autoComplete='off' />
                </div>
                <div>
                  <button onClick={this.changePassword} className='btn btn-primary'>Change Password</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Settings;
