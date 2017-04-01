/*----------Modules----------*/
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

/*----------Components----------*/
import Header from 'Header';

export class BookList extends Component {
  render() {
    return (
      <div>
        <Header />
      </div>

    );
  }
}

export default BookList;
