/*----------Modules----------*/
import React, {Component} from 'react';

/*----------Components----------*/

export class FeaturesPanel extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div className='feature-panel container'>
        <div className='row'>
          <div className='col-xs-6 bookBazaar-feature'>
            <h4>Catalogue Your Books Online</h4>
          </div>
          <div className='col-xs-6 bookBazaar-feature'>
            <h4>See All of the Books Owned by Users</h4>
          </div>
        </div>
        <div className='row'>
          <div className='col-xs-6 bookBazaar-feature'>
            <h4>Manage Books and Requests</h4>
          </div>
          <div className='col-xs-6 bookBazaar-feature'>
            <h4>Request to Borrow Other Users' Books</h4>
          </div>
        </div>
      </div>
    );
  }
}

export default FeaturesPanel;
