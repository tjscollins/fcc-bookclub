/*global describe it*/

/*----------Modules----------*/
import expect from 'expect';
import React from 'react';
// import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

/*----------Redux----------*/
import {Provider} from 'react-redux';
import configureStore from 'configureStore';

/*----------Components----------*/
import Login from 'Login';

describe('Login', () => {
  it('should exist', () => {
    expect(Login).toExist();
  });

  it('should render without errors', () => {
    try {
      const initialState = {
        userSession: {
          xAuth: null
        }
      };
      TestUtils.renderIntoDocument(
        <Provider store={configureStore(initialState)}>
          <Login/>
        </Provider>
      );
    } catch (error) {
      expect(error).toNotExist();
    }
  });
});
