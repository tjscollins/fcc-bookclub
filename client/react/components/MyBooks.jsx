/*----------Modules----------*/
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import $ from 'jquery';

/*----------Components----------*/
import Header from 'Header';

/*----------Redux----------*/
import * as actions from 'actions';

export class MyBooks extends Component {
  fetchBooks = () => {
    const {dispatch, userSession: {_id}} = this.props;
    let request = {
      url: '/mybooklist',
      method: 'GET',
      data: `id=${_id}`,
      dataType: 'json',
    };
    $.ajax(request)
      .done(({bookCollection}) => {
        if (bookCollection.length > this.props.userSession.bookCollection.length) {
          dispatch(actions.setBookCollection(bookCollection));
        }
      });
  }
  removeBook = (index) => {
    const {dispatch, userSession: {_id}} = this.props;
    let request = {
      url: '/mybooklist',
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
      },
      data: JSON.stringify({_id, index}),
      dataType: 'json',
    };
    $.ajax(request)
      .done(({bookCollection}) => {
        dispatch(actions.setBookCollection(bookCollection));
      })
      .catch((error) => {
        console.error(error);
      });
  }
  myBookshelf = () => {
    const {bookCollection} = this.props.userSession;
    console.log(bookCollection);
    return bookCollection.map((book, i) => {
      let {title, imageLinks: {thumbnail}, infoLink} = book.volumeInfo;
      return (
        <div className='book-on-shelf col-xs-6 col-sm-3 col-md-2'>
          <div className='book-header'>
            <a href={infoLink} target='_blank'>
              <h4>{title}</h4>
            </a>
            <i onClick={this.removeBook.bind(this, i)} className='fa fa-minus-square remove-book' />
          </div>
          <img src={thumbnail} />
        </div>
      );
    });
  }
  submit = (e) => {
    e.preventDefault();
    const {dispatch, userSession: {_id}} = this.props;
    const {newBook} = this.refs;
    let url = `https://www.googleapis.com/books/v1/volumes?intitle&q=` + `${newBook
      .value
      .trim()}&key=AIzaSyCql8XL9A8qSX2TRxKoiN-D4xlRLYxS0wE`;
    let request = {
      url,
      dataType: 'json',
      method: 'GET'
    };
    $
      .ajax(request)
      .done((booksFound) => {
        let {items} = booksFound;
        items.filter((item) => {
          return item
            .volumeInfo
            .title
            .toLowerCase()
            .trim() === newBook
            .value
            .toLowerCase()
            .trim();
        });
        if (items.length) {
          console.log(items);
          let request = {
            url: '/mybooklist',
            method: 'POST',
            cache: false,
            headers: {
              'Content-type': 'application/json'
            },
            dataType: 'json',
            data: JSON.stringify({_id, book: items[0]})
          };
          $
            .ajax(request)
            .done((item) => {
              console.log(item);
              dispatch(actions.addBook(item));
            })
            .catch((error) => {
              console.error(error);
            });
        }
      });
  }
  render() {
    this.fetchBooks();
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
          <div className='row'>
            {this.myBookshelf()}
          </div>
        </div>
      </div>
    );
  }
}

MyBooks.propTypes = {
  dispatch: PropTypes.func,
  userSession: PropTypes.object,
};

export default connect((state) => state)(MyBooks);
