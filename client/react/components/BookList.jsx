/*----------Modules----------*/
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import $ from 'jquery';

/*----------Components----------*/
import Header from 'Header';
import TradeRequests from 'TradeRequests';

/*----------Redux----------*/
import * as actions from 'actions';

export class BookList extends Component {
  componentDidMount() {
    this.fetchLibrary();
  }
  fetchLibrary = () => {
    const {library, dispatch} = this.props;
    let request = {
      url: '/library',
      method: 'GET',
      dataType: 'json'
    };
    $
      .ajax(request)
      .done((newLibrary) => {
        console.log(newLibrary);
        if (library.length !== newLibrary.length) {
          dispatch(actions.setLibrary(newLibrary));
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  requestBook(index) {
    const book = this.props.library[index];
    let request = {
      url: '/request',
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      data: book,
      dataType: 'json'
    };
    $.ajax(request)
      .done(() => {})
      .catch(console.error);
  }
  library = () => {
    const {library} = this.props;
    return library.map((book, i) => {
      let {title, imageLinks: {
          thumbnail
        }, infoLink} = JSON.parse(book.volumeInfo);
      return (
        <div key={`${title}-${i}`} className='book-on-shelf col-xs-6 col-sm-3 col-md-2'>
          <div className='book-header'>
            <a href={infoLink} target='_blank'>
              <h4>{title}</h4>
            </a>
            <i
              onClick={this
                .requestBook
                .bind(this, i)}
              className='fa fa-check-square request-book' />
          </div>
          <img src={thumbnail} />
        </div>
      );
    });
  }
  render() {
    return (
      <div>
        <Header />
        <br />
        <div className='container'>
          <TradeRequests />
          <div className='row'>
            <h1>All Books:</h1>
            <hr />
          </div>
          <div className='row'>
            {this.library()}
          </div>
        </div>
      </div>

    );
  }
}

BookList.propTypes = {
  dispatch: PropTypes.func,
  userSession: PropTypes.object,
  library: PropTypes.array
};

export default connect((state) => state)(BookList);
