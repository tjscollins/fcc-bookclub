/*----------Modules----------*/
import React, {Component, PropTypes} from 'react';
import {browserHistory} from 'react-router';
import {connect} from 'react-redux';

/*----------Components----------*/

export class FeaturesPanel extends Component {
  constructor() {
    super();
  }
  toBookList = () => {
    const {xAuth} = this.props;
    if(xAuth) {
      browserHistory.push('booklist');
    } else {
      browserHistory.push('login');
    }
  }
  toMyBooks = () => {
    const {xAuth} = this.props;
    if(xAuth) {
      browserHistory.push('mybooks');
    } else {
      browserHistory.push('login');
    }
  }
  render() {
    return (
      <div className='feature-panel container'>
        <div className='feature-row'>
          <div onClick={this.toMyBooks} className='bookBazaar-feature square'>
            <h4>Catalogue Your Books Online</h4>
          </div>
          <div onClick={this.toBookList} className='bookBazaar-feature square'>
            <h4>See All of the Books Owned by Users</h4>
          </div>
        </div>
        <div className='feature-row'>
          <div onClick={this.toMyBooks} className='bookBazaar-feature square'>
            <h4>Manage Books and Requests</h4>
          </div>
          <div onClick={this.toBookList} className='bookBazaar-feature square'>
            <h4>Request to Borrow Other Users' Books</h4>
          </div>
        </div>
      </div>
    );
  }
}

FeaturesPanel.propTypes = {
  xAuth: PropTypes.string,
};

export default connect((state) => Object.assign({}, {xAuth: state.userSession.xAuth}))(FeaturesPanel);
