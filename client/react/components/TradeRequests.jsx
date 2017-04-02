/*----------Modules----------*/
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import $ from 'jquery';

/*----------Components----------*/
// import Header from 'Header';

/*----------Redux----------*/
// import * as actions from 'actions';

export class TradeRequests extends Component {
  state = {
    showMyRequests: false,
    showIncomingRequests: false,
  }
  render() {
    const {showMyRequests, showIncomingRequests} = this.state;
    return (
      <div>
        <div className='row'>
          <button
            onClick={() => this.setState({
              showMyRequests: !showMyRequests
            })}
            className='btn btn-success'>
            Your trade requests
          </button>
          &nbsp;
          <button
            onClick={() => this.setState({
              showIncomingRequests: !showIncomingRequests
            })}
            className='btn btn-primary'>
            Trade requests for you
          </button>
        </div>
        {((display) => {
          if (display) {
            return (
              <div className='row'>
                <h3>Your Requests</h3>
                <hr />
              </div>
            );
          }
        })(showMyRequests)}
        {((display) => {
          if (display) {
            return (
              <div className='row'>
                <h3>Requests For You</h3>
                <hr />
              </div>
            );
          }
        })(showIncomingRequests)}
      </div>
    );
  }
}

export default connect((state) => state)(TradeRequests);
