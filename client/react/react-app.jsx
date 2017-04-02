/*----------React----------*/
import React from 'react';
import ReactDOM from 'react-dom';

/*----------Redux----------*/
import {Provider} from 'react-redux';
import configureStore from 'configureStore';

/*----------Components----------*/
import Application from 'Application';

const initialState = {
  userSession: {
    ...JSON.parse(sessionStorage.getItem('bookBazaar-login')),
    bookCollection: [],
    profile: {},
  },
};

ReactDOM.render(
  <Provider store={configureStore(initialState)}>
    <Application />
  </Provider>, document.getElementById('react-app'));
