/*----------Modules----------*/
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import $ from 'jquery';

/*----------Components----------*/
// import Header from 'Header';

/*----------Redux----------*/
import * as actions from 'actions';

export class TradeRequests extends Component {
  state = {
    showMyRequests: false,
    showIncomingRequests: false
  }
  componentDidMount() {
    this.fetchLoans();
    this.fetchLibrary();
    this.fetchBooks();
  }
  fetchBooks = () => {
    const {dispatch, userSession: {
        _id
      }} = this.props;
    let request = {
      url: '/mybooklist',
      method: 'GET',
      data: `id=${_id}`,
      dataType: 'json'
    };
    $
      .ajax(request)
      .done(({bookCollection}) => {
        dispatch(actions.setBookCollection(bookCollection));
      });
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
        // console.log(newLibrary);
        if (library.length !== newLibrary.length) {
          dispatch(actions.setLibrary(newLibrary));
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  fetchLoans = () => {
    const {dispatch, userSession: {
        _id
      }} = this.props;
    let request = {
      url: `/request?user=${_id}`,
      method: 'GET',
      dataType: 'json'
    };
    $
      .ajax(request)
      .done((loans) => {
        // console.log('Fetched Loans: ', loans);
        dispatch(actions.updateLoans(loans));
      })
      .catch((error) => {
        console.error(error);
      });
  }
  cancelLoanRequest = (book, index) => {
    const {dispatch, userSession} = this.props;
    const {_id} = userSession;
    // console.log('Canceling request: ', book);
    let request = {
      url: '/request',
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
      },
      data: JSON.stringify({book, _id}),
      dataType: 'json'
    };
    $.ajax(request)
      .done((res) => {
        dispatch(actions.cancelLoanRequest(book));
      })
      .catch(console.error);
  }
  render() {
    const {showMyRequests, showIncomingRequests} = this.state;
    const {loans} = this.props.userSession;
    const {library} = this.props;
    return (
      <div>
        <div className='row'>
          <button
            onClick={() => this.setState({
              showMyRequests: !showMyRequests
            })}
            className='btn btn-success'>
            {`Your trade requests (${loans.borrower.length} pending)`}
          </button>
          &nbsp;
          <button
            onClick={() => this.setState({
              showIncomingRequests: !showIncomingRequests
            })}
            className='btn btn-primary'>
            {`Trade requests for you (${loans.owner.length} pending)`}
          </button>
        </div>
        {((display) => {
          if (display) {
            return (
              <div className='row'>
                <h3>Your Requests</h3>
                <hr /> {loans
                  .borrower
                  .map((loan) => {
                    return library.filter((book) => {
                      return book._id === loan.book;
                    })[0];
                  })
                  .map((book, i) => {
                    let {title, imageLinks: {
                        smallThumbnail
                    }, infoLink} = JSON.parse(book.volumeInfo);
                    return (
                      <div
                        key={`${title}-request-${i}`}
                        className='book-on-shelf col-xs-6 col-sm-3 col-md-2'>
                        <div className='book-header'>
                          <a href={infoLink} target='_blank'>
                            <h4>{title}</h4>
                          </a>
                          <i onClick={this.cancelLoanRequest.bind(this, book, i)} className='fa fa-minus-square remove-book' />
                        </div>
                        <img src={smallThumbnail} />
                      </div>
                    );
                  })}
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
                {loans
                  .owner
                  .map((loan) => {
                    return library.filter((book) => {
                      return book._id === loan.book;
                    })[0];
                  })
                  .map((book, i) => {
                    let {title, imageLinks: {
                        smallThumbnail
                    }, infoLink} = JSON.parse(book.volumeInfo);
                    return (
                      <div
                        key={`${title}-request-${i}`}
                        className='book-on-shelf col-xs-6 col-sm-3 col-md-2'>
                        <div className='book-header'>
                          <a href={infoLink} target='_blank'>
                            <h4>{title}</h4>
                          </a>
                          {/* <i className='fa fa-times remove-book' /> */}
                        </div>
                        <img src={smallThumbnail} />
                      </div>
                    );
                  })}
              </div>
            );
          }
        })(showIncomingRequests)}
      </div>
    );
  }
}

TradeRequests.propTypes = {
  dispatch: PropTypes.func,
  library: PropTypes.array,
  userSession: PropTypes.object
};

export default connect((state) => state)(TradeRequests);
