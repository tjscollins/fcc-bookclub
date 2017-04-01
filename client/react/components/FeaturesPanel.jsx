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
        <div className='feature-row'>
          <div className='bookBazaar-feature square'>
            <h4>Catalogue Your Books Online</h4>
          </div>
          <div className='bookBazaar-feature square'>
            <h4>See All of the Books Owned by Users</h4>
          </div>
        </div>
        <div className='feature-row'>
          <div className='bookBazaar-feature square'>
            <h4>Manage Books and Requests</h4>
          </div>
          <div className='bookBazaar-feature square'>
            <h4>Request to Borrow Other Users' Books</h4>
          </div>
        </div>
      </div>
    );
  }
}

export default FeaturesPanel;
