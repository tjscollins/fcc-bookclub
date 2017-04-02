/*----------Modules----------*/
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import $ from 'jquery';

/*----------Components----------*/
import Header from 'Header';

/*----------Redux----------*/
import * as actions from 'actions';

export class Settings extends Component {
  changePassword = () => {

  }
  fetchProfile = () => {
    const {dispatch, userSession: {_id}} = this.props;
    let request = {
      url: '/profile',
      method: 'GET',
      data: `id=${_id}`,
      dataType: 'json',
    };
    $.ajax(request)
      .done(({profile}) => {
          dispatch(actions.setProfile(profile));
      });
  }
  updateProfile = () => {
    const {userSession: {_id}, dispatch} = this.props;
    const {name, city, state} = this.refs;
    let request = {
      url: '/profile',
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      data: JSON.stringify({
        name: name.value,
        city: city.value,
        state: state.value,
        _id,
      }),
      dataType: 'json',
    };
    $
      .ajax(request)
      .done((profile) => {
        name.value = '';
        city.value = '';
        state.value = '';
        dispatch(actions.setProfile(profile));
      })
      .catch((error) => {
        console.error(error);
      });
  }
  render() {
    const {name, city, state} = this.props.userSession.profile;
    if(!name) this.fetchProfile();
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
                    placeholder={name}
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
                    placeholder={city}
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
                    placeholder={state}
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

Settings.propTypes = {
  dispatch: PropTypes.func,
  userSession: PropTypes.object,
};

export default connect((state) => state)(Settings);
