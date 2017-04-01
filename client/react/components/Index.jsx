/*----------Modules----------*/
import React from 'react';

/*----------Components----------*/
import FeaturesPanel from 'FeaturesPanel';
import Header from 'Header';

export class Index extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div>
        <Header />
        <div className='jumbotron'>
          <div className='container'>
            <h1>bookBazaar</h1>
            <h4>bring a book, take a book</h4>
            <a className='btn btn-primary btn-lg' href='#' role='button'>Learn more</a>
          </div>
        </div>

        <FeaturesPanel />
      </div>
    );
  }
}

export default Index;
