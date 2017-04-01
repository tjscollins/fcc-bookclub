/*----------Modules----------*/
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

/*----------Components----------*/
import Header from 'Header';

export class MyBooks extends Component {
  submit = (e) => {
    e.preventDefault();
    const {newBook} = this.refs;
  }
  render() {
    return (
      <div>
        <Header />
        <br />
        <div className='container'>
          <div className='row'>
            <button className='btn btn-success'>
              Your trade requests
            </button>
            &nbsp;
            <button className='btn btn-primary'>
              Trade requests for you
            </button>
          </div>
          <div className='row'>
            <h1>My Books:</h1>
            <hr />
          </div>
          <div className='row'>
            <form className='form-inline' onSubmit={this.submit}>
              <div className='form-group'>
                <input className='form-control' type='text' ref='newBook' required />
                &nbsp;
                <button onClick={this.submit} className='btn btn-primary'>
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default MyBooks;
