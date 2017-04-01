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
import Register from 'Register';

describe('Register', () => {
  it('should exist', () => {
    expect(Register).toExist();
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
          <Register />
        </Provider>
      );
    } catch (error) {
      expect(error).toNotExist();
    }
  });
});
